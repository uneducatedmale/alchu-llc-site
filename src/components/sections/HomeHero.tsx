// src/components/sections/HomeHero.tsx
import Image from "next/image"
import Link from "next/link"
import { site } from "@/config/site"

export default function HomeHero() {
  return (
    <section className="bg-gray-50">
      <div className="container-padded grid items-center gap-10 py-16 lg:grid-cols-2">
        {/* Text side */}
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Hi, I&apos;m <span className="font-semibold">[Your Dad’s Name]</span>. I run a small,
            family-helped contracting business serving Syracuse and nearby towns. I focus on
            quality work, clear communication, and clean job sites.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-emerald-700 px-6 py-3 font-medium text-white hover:opacity-90"
            >
              Request a Quote
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-100"
            >
              Call {formatPhone(site.phone)}
            </a>
          </div>

          {/* Badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
            <Badge label="Insured" />
            <Badge label="Family Owned" />
            <Badge label="Serving Syracuse" />
          </div>
        </div>

        {/* Image side */}
        <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:order-2">
          <Image
            src="/images/hero/dad-hero.jpg"
            alt="Local contractor at work measuring a deck board"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <div className="rounded-lg border bg-white px-4 py-2 text-center font-medium">
      {label}
    </div>
  )
}

// Formats +1-315-555-0123 into (315) 555-0123 for display
function formatPhone(p: string) {
  const digits = p.replace(/[^\d]/g, "")
  const n = digits.length >= 10 ? digits.slice(-10) : digits
  const a = n.slice(0, 3)
  const b = n.slice(3, 6)
  const c = n.slice(6)
  return n.length === 10 ? `(${a}) ${b}-${c}` : p
}
