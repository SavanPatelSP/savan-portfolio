import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import ContactEmail from "@/emails/contact-email";
import { checkRateLimit } from "@/lib/security/rate-limit";

const TAG = "[contact]";
const MAX_BODY_SIZE = 1024 * 10; // 10KB

function log(level: "info" | "warn" | "error", msg: string, data?: Record<string, unknown>) {
  const entry = `${TAG} ${msg}`;
  const extra = data ? " " + JSON.stringify(data) : "";
  if (level === "error") console.error(entry + extra);
  else if (level === "warn") console.warn(entry + extra);
  else console.log(entry + extra);
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const maskedLocal = local.length > 2 ? local[0] + "***" + local[local.length - 1] : "***";
  return `${maskedLocal}@${domain}`;
}

function maskName(name: string): string {
  return name.length > 2 ? name[0] + "***" + name[name.length - 1] : "***";
}

function sanitizeForLog(input: string): string {
  return input.replace(/[<>"'&]/g, "").slice(0, 100);
}

function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");

  if (!host) return false;

  const allowedOrigins = [
    `https://${host}`,
    `http://localhost:3000`,
    `http://127.0.0.1:3000`,
  ];

  const checkUrl = origin || referer;
  if (!checkUrl) return false;

  try {
    const url = new URL(checkUrl);
    return allowedOrigins.some((allowed) => {
      const allowedUrl = new URL(allowed);
      return url.hostname === allowedUrl.hostname && url.protocol === allowedUrl.protocol;
    });
  } catch {
    return false;
  }
}

function env(name: string): string {
  const val = process.env[name];
  if (!val || val.trim() === "") {
    log("error", `Environment variable ${name} is not set`);
    return "";
  }
  return val.trim();
}

export async function POST(req: Request) {
  const start = Date.now();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  log("info", "Request received", { ip: sanitizeForLog(ip) });

  try {
    if (!isValidOrigin(req)) {
      log("warn", "Invalid origin", { origin: sanitizeForLog(req.headers.get("origin") || "none") });
      return NextResponse.json(
        { error: "Invalid request origin" },
        { status: 403 },
      );
    }

    const rl = await checkRateLimit(`contact:${ip}`);
    if (!rl.allowed) {
      log("warn", "Rate limited", { ip: sanitizeForLog(ip) });
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    let bodyText: string;
    try {
      const reader = req.body?.getReader();
      if (!reader) throw new Error("No body");
      const chunks: Uint8Array[] = [];
      let totalSize = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalSize += value.length;
        if (totalSize > MAX_BODY_SIZE) {
          log("warn", "Body too large", { ip: sanitizeForLog(ip), size: totalSize });
          return NextResponse.json({ error: "Request body too large" }, { status: 413 });
        }
        chunks.push(value);
      }
      bodyText = new TextDecoder().decode(new Uint8Array(chunks.flatMap((c) => Array.from(c))));
    } catch {
      log("warn", "Failed to read body", { ip: sanitizeForLog(ip) });
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    let body: unknown;
    try {
      body = JSON.parse(bodyText);
    } catch {
      log("warn", "Invalid JSON body", { ip: sanitizeForLog(ip) });
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, email, message, website } = body as Record<string, unknown>;

    if (website) {
      log("info", "Honeypot triggered", { ip: sanitizeForLog(ip) });
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      log("warn", "Validation failed: missing fields", {
        ip: sanitizeForLog(ip),
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message,
      });
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      log("warn", "Validation failed: wrong types", { ip: sanitizeForLog(ip) });
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      log("warn", "Validation failed: input too long", {
        ip: sanitizeForLog(ip),
        nameLen: name.length,
        emailLen: email.length,
        msgLen: message.length,
      });
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      log("warn", "Validation failed: invalid email format", { ip: sanitizeForLog(ip) });
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    log("info", "Validation passed", {
      ip: sanitizeForLog(ip),
      name: maskName(name),
      email: maskEmail(email),
    });

    const apiKey = env("RESEND_API_KEY");
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured. Please email me directly." },
        { status: 503 },
      );
    }

    const fromAddress = env("CONTACT_FROM");
    if (!fromAddress) {
      return NextResponse.json(
        { error: "Email sender is not configured. Please email me directly." },
        { status: 503 },
      );
    }

    const toAddress = env("CONTACT_EMAIL");
    if (!toAddress) {
      return NextResponse.json(
        { error: "Email recipient is not configured. Please email me directly." },
        { status: 503 },
      );
    }

    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    let html: string;
    try {
      html = await render(
        ContactEmail({ name, email, message, date, time }),
      );
    } catch (renderErr) {
      log("error", "Failed to render email template, falling back to plain text", { error: String(renderErr) });
      html = "";
    }

    if (!html || html.length === 0) {
      log("info", "HTML email empty, sending plain text only");
    }

    log("info", "HTML rendered", { htmlLength: html.length });

    const text = `New website enquiry received\n\nVisitor\nName: ${name}\nEmail: ${email}\n\nSubmission\nDate: ${date}\nTime: ${time}\n\nMessage\n${message}\n\n---\nThis message was generated automatically by the SP NET Portfolio contact form.\n© SP NET INC`;

    const payload: Record<string, unknown> = {
      from: `Contact <${fromAddress}>`,
      to: [toAddress],
      subject: `New message from ${maskName(name)}`,
      replyTo: email,
      text,
    };

    if (html && html.length > 0) {
      payload.html = html;
    }

    log("info", "Sending email via Resend", {
      to: maskEmail(toAddress),
      subject: `New message from ${maskName(name)}`,
      htmlLength: html.length,
    });

    let res: Response;
    try {
      res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (fetchErr) {
      log("error", "Network error contacting Resend", { error: String(fetchErr) });
      return NextResponse.json(
        { error: "Could not reach email provider. Please try again later." },
        { status: 502 },
      );
    }

    const resBody = await res.text();
    let _resJson: Record<string, unknown> = {};
    try { _resJson = JSON.parse(resBody); } catch { /* not JSON */ }

    if (!res.ok) {
      log("error", "Resend rejected the request", { status: res.status });
      return NextResponse.json(
        {
          error: "Email provider returned an error. Please email me directly.",
        },
        { status: 502 },
      );
    }

    const elapsed = Date.now() - start;
    log("info", "Email accepted by Resend", { elapsed: `${elapsed}ms` });

    return NextResponse.json({ ok: true });
  } catch (err) {
    log("error", "Unhandled exception", { error: String(err) });
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
