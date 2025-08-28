// src/app/api/contact/route.ts
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const data = Object.fromEntries(form.entries())

    const name = String(data.name || "").trim()
    const email = String(data.email || "").trim()
    const message = String(data.message || "").trim()
    const phone = String(data.phone || "").trim()
    const town = String(data.town || "").trim()
    const service = String(data.service || "").trim()
    const timeline = String(data.timeline || "").trim()
    const budget = String(data.budget || "").trim()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const to = process.env.CONTACT_TO!
    const from = process.env.CONTACT_FROM || "forms@example.com"

    // Build a plain-text body (deliverability-friendly)
    const text = [
      `New quote request`,
      `-------------------`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Town: ${town || "-"}`,
      `Service: ${service || "-"}`,
      `Timeline: ${timeline || "-"}`,
      `Budget: ${budget || "-"}`,
      ``,
      `Message:`,
      message
    ].join("\n")

    await resend.emails.send({
      from,
      to,
      replyTo: email, // so you can reply straight to the customer
      subject: `New quote request from ${name}`,
      text
    })

    return NextResponse.redirect(new URL("/contact/thanks", req.url), { status: 303 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
