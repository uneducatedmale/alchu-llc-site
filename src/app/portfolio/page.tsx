import { Metadata } from "next"
import { site } from "@/config/site"
import services from "@/data/services.json"
import projects from "@/data/projects.json"
import PortfolioAccordion from "@/components/sections/PortfolioAccordion"

export const metadata: Metadata = {
  title: `Portfolio | ${site.name}`,
  description: "See completed projects organized by service category."
}

export default function PortfolioPage() {
  // You can filter services to only those you want public in the portfolio, if needed.
  return <PortfolioAccordion services={services as any} projects={projects as any} />
}
