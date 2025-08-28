// src/app/contact/page.tsx
import { site } from "@/config/site"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: "Request a quote or ask a question about your project."
}

// Helper: if you set NEXT_PUBLIC_FORMSPREE_ID we use Formspree, else fallback to /api/contact
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID
const actionUrl = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "/api/contact"

export default function ContactPage() {
  return (
    <div className="container-padded py-16">
      <h1 className="text-3xl font-bold tracking-tight">Request a quote</h1>
      <p className="mt-2 max-w-2xl text-gray-700">
        Share a few details and we&apos;ll follow up. You can also call{" "}
        <a className="underline" href={`tel:${site.phone}`}>{site.phone}</a>.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {/* Form */}
        <form
          action={actionUrl}
          method="POST"
          className="rounded-lg border bg-white p-6 shadow-sm md:col-span-2"
        >
          {/* Honeypot to reduce spam */}
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          {/* If using Formspree, you can set a redirect: */}
          {FORMSPREE_ID && <input type="hidden" name="_redirect" value="/contact/thanks" />}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                required
                name="name"
                className="mt-1 w-full rounded-md border p-3"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                required
                type="email"
                name="email"
                className="mt-1 w-full rounded-md border p-3"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                name="phone"
                className="mt-1 w-full rounded-md border p-3"
                placeholder="(315) 555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Town/Area</label>
              <input
                name="town"
                className="mt-1 w-full rounded-md border p-3"
                placeholder="Syracuse / Liverpool / Baldwinsville"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Service needed</label>
              <select name="service" className="mt-1 w-full rounded-md border p-3">
                <option>Decks</option>
                <option>Roofing</option>
                <option>Interior Remodeling</option>
                <option>Tile</option>
                <option>Painting</option>
                <option>Concrete</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Timeline</label>
              <select name="timeline" className="mt-1 w-full rounded-md border p-3">
                <option>Urgent (this month)</option>
                <option>1–3 months</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Budget range (optional)</label>
            <input
              name="budget"
              className="mt-1 w-full rounded-md border p-3"
              placeholder="Example: $5k–$10k"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Project details</label>
            <textarea
              required
              name="message"
              className="mt-1 h-32 w-full rounded-md border p-3"
              placeholder="Describe the scope, size, and any specifics. Links to photos help."
            />
          </div>

          {/* Simple acceptance (optional) */}
          <div className="mt-4 flex items-center gap-2">
            <input type="checkbox" name="allowContact" id="allowContact" defaultChecked />
            <label htmlFor="allowContact" className="text-sm text-gray-700">
              I agree to be contacted about my request.
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="rounded-lg bg-emerald-700 px-6 py-3 font-medium text-white hover:opacity-90">
              Send request
            </button>
            <a href={`tel:${site.phone}`} className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-100">
              Or call {site.phone}
            </a>
          </div>
        </form>

        {/* Sidebar with contact info */}
        <aside className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="font-semibold">{site.name}</div>
          <div className="mt-2 text-sm text-gray-700">
            {site.address}
            <br />
            <a className="underline" href={`tel:${site.phone}`}>{site.phone}</a>
            <br />
            <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
          </div>

          <div className="mt-6 text-sm text-gray-700">
            <div className="font-semibold">Typical response</div>
            We follow up within 1 business day for most requests.
          </div>

          <div className="mt-6 text-sm">
            <Link className="underline" href="/reviews">Read recent reviews</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
