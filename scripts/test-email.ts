#!/usr/bin/env npx tsx
/**
 * Test script for the contact form email delivery.
 *
 * Usage:
 *   npx tsx scripts/test-email.ts              # send a test email
 *   npx tsx scripts/test-email.ts --check      # only check env vars
 *
 * Required env vars:
 *   RESEND_API_KEY   – Resend API key
 *   CONTACT_FROM     – sender address (must be from a verified domain)
 *   CONTACT_EMAIL    – recipient address
 */

const REQUIRED_VARS = ["RESEND_API_KEY", "CONTACT_FROM", "CONTACT_EMAIL"] as const;

function checkEnv(): boolean {
  let ok = true;
  for (const name of REQUIRED_VARS) {
    const val = process.env[name];
    if (!val || val.trim() === "") {
      console.error(`  ✗ ${name} is NOT set`);
      ok = false;
    } else {
      const display = name === "RESEND_API_KEY" ? val.slice(0, 8) + "…" : val;
      console.log(`  ✓ ${name} = ${display}`);
    }
  }
  return ok;
}

async function sendTestEmail(): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY!.trim();
  const from = process.env.CONTACT_FROM!.trim();
  const to = process.env.CONTACT_EMAIL!.trim();

  const payload = {
    from: `Contact <${from}>`,
    to: [to],
    subject: "Test email from portfolio contact form",
    replyTo: "test@example.com",
    text: "This is a test email sent from the portfolio contact form test script.\n\nIf you received this, the email pipeline is working correctly.",
  };

  console.log("\nSending test email...");
  console.log(`  From: ${from}`);
  console.log(`  To:   ${to}`);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  let json: Record<string, unknown> = {};
  try { json = JSON.parse(body); } catch { /* not JSON */ }

  if (res.ok) {
    console.log(`\n  ✓ Email accepted (status ${res.status})`);
    console.log(`  ✓ ID: ${(json as { id?: string }).id ?? "unknown"}`);
    console.log("\nCheck your inbox to confirm delivery.");
  } else {
    console.error(`\n  ✗ Email rejected (status ${res.status})`);
    console.error(`  ✗ Response: ${body.slice(0, 500)}`);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes("--check");

  console.log("Contact form email configuration check\n");
  const envOk = checkEnv();

  if (!envOk) {
    console.error(
      "\nMissing environment variables. Create a .env.local file with the required values.\n"
    );
    process.exit(1);
  }

  console.log("\nAll environment variables are set.");

  if (checkOnly) return;

  try {
    await sendTestEmail();
  } catch (err) {
    console.error(`\n  ✗ Network error: ${String(err)}`);
    process.exit(1);
  }
}

main();
