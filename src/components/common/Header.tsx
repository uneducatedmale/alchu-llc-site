// src/components/common/Header.tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { site } from "@/config/site"

// Simple, responsive header with a mobile menu and a visible Call button.
// No external UI libs, just Tailwind classes.

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="text-base font-semibold tracking-tight">
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-emerald-700">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Call button */}
        <a
          href={`tel:${site.phone}`}
          className="ml-3 hidden rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:opacity-90 md:inline-flex"
        >
          Call {formatPhone(site.phone)}
        </a>

        {/* Mobile menu toggle */}
        <button
          aria-label="Toggle menu"
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="grid gap-2 py-3">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-2 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${site.phone}`}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                onClick={() => setOpen(false)}
              >
                Call {formatPhone(site.phone)}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

// Basic phone formatter so the header looks nice.
function formatPhone(p: string) {
  // Accepts forms like +1-315-555-0123 and returns (315) 555-0123
  const digits = p.replace(/[^\d]/g, "")
  const n = digits.length >= 10 ? digits.slice(-10) : digits
  const area = n.slice(0, 3)
  const mid = n.slice(3, 6)
  const last = n.slice(6)
  return n.length === 10 ? `(${area}) ${mid}-${last}` : p
}
