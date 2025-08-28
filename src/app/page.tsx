import HomeHero from "@/components/sections/HomeHero"
import ServicesGrid from "@/components/sections/ServicesGrid"
import ReviewsStrip from "@/components/sections/ReviewsStrip"

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesGrid />
      <ReviewsStrip />
      {/* Next chunk: Contact strip */}
    </>
  )
}

