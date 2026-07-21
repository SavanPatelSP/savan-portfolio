import { NextResponse } from "next/server";
import { parseCSPReport, logCSPReport } from "@/lib/security/csp-report";

export async function POST(req: Request) {
  try {
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
