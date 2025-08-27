// src/config/site.ts
// Central place for site-wide info. Update once, reflected everywhere.

export const site = {
  name: "ALCHU LLC",
  tagline: "Local craftsmanship, one project at a time",
  description:
    "ALCHU LLC is a local contractor serving the Syracuse area with decks, roofing, remodeling, tile, painting, and concrete.",
  phone: "+1-315-555-0123",
  email: "info@alchullc.com",
  address: "Syracuse, NY",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" }
  ]
} as const
