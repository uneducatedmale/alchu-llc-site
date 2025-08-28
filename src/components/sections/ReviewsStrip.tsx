// src/components/sections/ReviewsStrip.tsx
import testimonials from "@/data/testimonials.json"
import type { Testimonial } from "@/types/content"
import Link from "next/link"

export default function ReviewsStrip() {
  const list = testimonials as Testimonial[]
  const featured = list.slice(0, 3) // show first 3 on home

  return (
    <section className="bg-gray-50">
      <div className="container-padded py-16">
        <h2 className="text-3xl font-bold tracking-tight">What customers say</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <Quote key={i} {...t} />
          ))}
        </div>

        <div className="mt-8">
          <Link href="/reviews" className="inline-block font-medium hover:text-emerald-700">
            Read more reviews →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Quote({ quote, author, location }: Testimonial) {
  return (
    <figure className="rounded-lg border bg-white p-6 shadow-sm">
      <blockquote className="text-gray-800">“{quote}”</blockquote>
      <figcaption className="mt-3 text-sm text-gray-600">
        — {author}{location ? `, ${location}` : ""}
      </figcaption>
    </figure>
  )
}
