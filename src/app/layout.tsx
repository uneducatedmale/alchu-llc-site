// src/app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import { site } from "@/config/site"

// Central metadata for SEO and social previews.
// You can refine this later with per-page metadata if needed.
export const metadata: Metadata = {
  title: `${site.name} | Syracuse Contractor`,
  description: site.description,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${site.name} | Syracuse Contractor`,
    description: site.description,
    type: "website",
    url: "https://example.com", // replace after you add your domain
    siteName: site.name,
    images: [{ url: "/og-image.png" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Syracuse Contractor`,
    description: site.description,
    images: ["/og-image.png"]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
