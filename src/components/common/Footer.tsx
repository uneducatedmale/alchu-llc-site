// src/components/common/Footer.tsx
import { site } from "@/config/site"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-600 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-semibold">{site.name}</div>
            <div>{site.address}</div>
            <div>Insured - Family Owned</div>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <div>
              <a className="hover:text-emerald-700" href={`tel:${site.phone}`}>
                {site.phone}
              </a>
            </div>
            <div>
              <a className="hover:text-emerald-700" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>

          <div>
            <div className="font-semibold">Quick links</div>
            <ul className="mt-2 space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-emerald-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 text-xs">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
