// src/app/reviews/page.tsx
import testimonials from "@/data/testimonials.json"
import type { Testimonial } from "@/types/content"
import { site } from "@/config/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Reviews | ${site.name}`,
  description: "Customer testimonials and feedback."
}

export default function ReviewsPage() {
  const list = testimonials as Testimonial[]

  return (
    <div className="container-padded py-16">
      <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
      <p className="mt-2 text-gray-700">
        Here’s what recent customers have said about working with {site.name}.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {list.map((t, i) => (
          <figure key={i} className="rounded-lg border bg-white p-6 shadow-sm">
            <blockquote className="text-gray-800">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-gray-600">
              — {t.author}{t.location ? `, ${t.location}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
