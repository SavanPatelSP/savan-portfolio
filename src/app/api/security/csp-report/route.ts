import { NextResponse } from "next/server";
import { parseCSPReport, logCSPReport } from "@/lib/security/csp-report";
import { checkRateLimit } from "@/lib/security/rate-limit";

function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  try {
    const ip = getClientIP(req);
    const { allowed } = await checkRateLimit(`csp-report:${ip}`);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json") && !contentType.includes("application/csp-report")) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const report = parseCSPReport(body);
    if (!report) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    logCSPReport(report);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "csp-report" });
}
