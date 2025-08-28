// src/app/services/page.tsx
import Image from "next/image"
import services from "@/data/services.json"
import type { Service } from "@/types/content"
import { Metadata } from "next"
import { site } from "@/config/site"

export const metadata: Metadata = {
  title: `Services | ${site.name}`,
  description: "Overview of core services with short notes on what is included.",
}

export default function ServicesPage() {
  const list = services as Service[]

  return (
    <div className="container-padded py-16">
      <h1 className="text-3xl font-bold tracking-tight">Services</h1>
      <p className="mt-2 max-w-2xl text-gray-700">
        The focus is quality work and clear communication. Below are the most common requests. If you need something
        not listed, ask on the contact page.
      </p>

      <div className="mt-10 grid gap-10">
        {list.map((svc) => (
          <section key={svc.slug} id={svc.slug} className="scroll-mt-24">
            <div className="grid items-start gap-6 md:grid-cols-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                {svc.coverImage ? (
                  <Image
                    src={svc.coverImage}
                    alt={svc.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{svc.title}</h2>
                <p className="mt-2 text-gray-700">{svc.blurb}</p>

                {/* Placeholder bullets. Replace with real inclusions later. */}
                <ul className="mt-4 list-disc space-y-1 pl-5 text-gray-700">
                  <li>Clear scope and written estimate</li>
                  <li>Clean job site and on time arrival</li>
                  <li>Materials discussed up front</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-gray-200" />
          </section>
        ))}
      </div>
    </div>
  )
}
