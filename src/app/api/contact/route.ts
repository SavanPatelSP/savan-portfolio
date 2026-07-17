import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import ContactEmail from "@/emails/contact-email";

const TAG = "[contact]";
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 2;
const hits = new Map<string, { count: number; resetAt: number }>();

function log(level: "info" | "warn" | "error", msg: string, data?: Record<string, unknown>) {
  const entry = `${TAG} ${msg}`;
  const extra = data ? " " + JSON.stringify(data) : "";
  if (level === "error") console.error(entry + extra);
  else if (level === "warn") console.warn(entry + extra);
  else console.log(entry + extra);
}

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  if (entry.count >= RATE_LIMIT_MAX) return { allowed: false, remaining: 0 };
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
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

  log("info", "Request received", { ip });

  try {
    const rl = rateLimit(ip);
    if (!rl.allowed) {
      log("warn", "Rate limited", { ip });
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      log("warn", "Invalid JSON body", { ip });
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, email, message } = body as Record<string, unknown>;

    if (!name || !email || !message) {
      log("warn", "Validation failed: missing fields", { ip, hasName: !!name, hasEmail: !!email, hasMessage: !!message });
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      log("warn", "Validation failed: wrong types", { ip });
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      log("warn", "Validation failed: input too long", { ip, nameLen: name.length, emailLen: email.length, msgLen: message.length });
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      log("warn", "Validation failed: invalid email format", { ip, email });
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    log("info", "Validation passed", { ip, name, email });

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

    const html = render(
      ContactEmail({ name, email, message, date, time }),
    );

    const text = `New website enquiry received\n\nVisitor\nName: ${name}\nEmail: ${email}\n\nSubmission\nDate: ${date}\nTime: ${time}\n\nMessage\n${message}\n\n---\nThis message was generated automatically by the SP NET Portfolio contact form.\n© SP NET INC`;

    log("info", "Sending email via Resend", { from: fromAddress, to: toAddress, subject: `New message from ${name}` });

    let res: Response;
    try {
      res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: `Contact <${fromAddress}>`,
          to: [toAddress],
          subject: `New message from ${name}`,
          replyTo: email,
          html,
          text,
        }),
      });
    } catch (fetchErr) {
      log("error", "Network error contacting Resend", { error: String(fetchErr) });
      return NextResponse.json(
        { error: "Could not reach email provider. Please try again later." },
        { status: 502 },
      );
    }

    const resBody = await res.text();
    let resJson: Record<string, unknown> = {};
    try { resJson = JSON.parse(resBody); } catch { /* not JSON */ }

    if (!res.ok) {
      log("error", "Resend rejected the request", { status: res.status, body: resBody });
      return NextResponse.json(
        {
          error: `Email provider returned an error (${res.status}). Please email me directly.`,
          providerError: resJson.message || resBody,
        },
        { status: 502 },
      );
    }

    const emailId = (resJson as { id?: string }).id || "unknown";
    const elapsed = Date.now() - start;
    log("info", "Email accepted by Resend", { emailId, elapsed: `${elapsed}ms` });

    return NextResponse.json({ ok: true, id: emailId });
  } catch (err) {
    log("error", "Unhandled exception", { error: String(err) });
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
