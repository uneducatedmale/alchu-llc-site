export type Service = {
  title: string
  slug: string
  blurb: string
  coverImage?: string
}

export type Testimonial = {
  quote: string
  author: string
  location?: string
}


export type Project = {
  title: string
  category: string // matches a Service.slug
  location: string
  summary: string
  images: string[]  // multiple photos per project
}
