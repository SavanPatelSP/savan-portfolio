import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: `Contact <onboarding@resend.dev>`,
          to: ["savan@sp-net.in", "savanpatel@sp-net.in"],
          subject: `New message from ${name}`,
          replyTo: email,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
      }
    } else {
      console.log("--- Contact Form Submission ---");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);
      console.log("---");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
