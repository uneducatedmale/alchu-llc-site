// src/components/sections/ServicesGrid.tsx
import Image from "next/image"
import Link from "next/link"
import services from "@/data/services.json"
import type { Service } from "@/types/content"

export default function ServicesGrid() {
  const list = services as Service[]

  return (
    <section className="container-padded py-16">
      <h2 className="text-3xl font-bold tracking-tight">Services</h2>
      <p className="mt-2 text-gray-700">
        Decks, roofing, interior remodeling, tile, painting, and concrete. Honest estimates and careful work.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((svc) => (
          <ServiceCard key={svc.slug} service={svc} />
        ))}
      </div>

      <div className="mt-8">
        <Link href="/services" className="inline-block font-medium hover:text-emerald-700">
          See all services →
        </Link>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const { title, blurb, slug, coverImage } = service

  return (
    <Link
      href={`/services#${slug}`}
      className="rounded-lg border p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 33vw"
          />
        ) : (
          // Simple color fallback if you have not added a photo yet
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-700">{blurb}</p>
      </div>
    </Link>
  )
}
