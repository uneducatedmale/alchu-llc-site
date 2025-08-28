"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Service, Project } from "@/types/content"

export default function PortfolioAccordion({
  services,
  projects
}: {
  services: Service[]
  projects: Project[]
}) {
  // Group projects by category
  const byCategory = useMemo(() => {
    const map: Record<string, Project[]> = {}
    for (const p of projects) {
      if (!map[p.category]) map[p.category] = []
      map[p.category].push(p)
    }
    return map
  }, [projects])

  const [openSlug, setOpenSlug] = useState<string | null>(null)

  // Modal state for a selected project
  const [openProject, setOpenProject] = useState<Project | null>(null)
  // Lightbox state for a selected image within the modal
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const toggleCategory = (slug: string) => {
    setOpenSlug((curr) => (curr === slug ? null : slug))
  }

  const openProjectModal = (p: Project) => {
    setOpenProject(p)
    setLightboxIndex(null)
  }
  const closeProjectModal = useCallback(() => {
    setOpenProject(null)
    setLightboxIndex(null)
  }, [])

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  // Close on ESC for modal/lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) closeLightbox()
        else if (openProject) closeProjectModal()
      }
      if (openProject && lightboxIndex !== null) {
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % openProject.images.length))
        if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + openProject.images.length) % openProject.images.length))
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [openProject, lightboxIndex, closeLightbox, closeProjectModal])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (openProject) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => { document.body.style.overflow = prev }
    }
  }, [openProject])

  return (
    <div className="container-padded py-16">
      <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
      <p className="mt-2 max-w-2xl text-gray-700">
        Browse recent work by category. Open a section to see projects for that service.
      </p>

      <div className="mt-8 space-y-4">
        {services.map((svc) => {
          const items = byCategory[svc.slug] || []
          const open = openSlug === svc.slug

          return (
            <section key={svc.slug} className="rounded-lg border bg-white shadow-sm">
              {/* Category header */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`panel-${svc.slug}`}
                onClick={() => toggleCategory(svc.slug)}
                className="flex w-full items-center justify-between gap-4 rounded-lg p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold">{svc.title}</div>
                  <div className="text-sm text-gray-600">
                    {items.length} project{items.length === 1 ? "" : "s"}
                  </div>
                </div>
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs transition ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>

              {/* Collapsible panel */}
              <div
                id={`panel-${svc.slug}`}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  <div className="border-t p-4 md:p-6">
                    {items.length === 0 ? (
                      <p className="text-sm text-gray-600">No projects yet for this category.</p>
                    ) : (
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((p, i) => (
                          <ProjectCard key={`${p.title}-${i}`} project={p} onOpen={() => openProjectModal(p)} />
                        ))}
                      </div>
                    )}
                    <div className="mt-6 text-sm">
                      <Link href={`/services#${svc.slug}`} className="underline hover:text-emerald-700">
                        Learn more about {svc.title.toLowerCase()} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Modal for a selected project (click outside or ✕ to close) */}
      {openProject && (
        <Modal onClose={closeProjectModal}>
          <ProjectModalContent
            project={openProject}
            lightboxIndex={lightboxIndex}
            onOpenLightbox={openLightbox}
            onCloseLightbox={closeLightbox}
            setLightboxIndex={setLightboxIndex}
          />
        </Modal>
      )}
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const thumb = project.images?.[0]
  return (
    <article
      tabIndex={0}
      className="group cursor-pointer overflow-hidden rounded-lg border shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      role="button"
      aria-label={`Open ${project.title}`}
    >
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        {thumb ? (
          <Image src={thumb} alt={project.title} fill className="object-cover transition group-hover:scale-[1.02]" sizes="(max-width:1024px) 100vw, 33vw" />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{project.location}</p>
        <p className="mt-2 text-sm text-gray-700">{project.summary}</p>
        <p className="mt-2 text-xs text-gray-500">{project.images?.length || 0} photo(s)</p>
      </div>
    </article>
  )
}

/* ---------- Modal primitives ---------- */

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  // Click-outside to close
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={onBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-xl bg-white p-4 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-xl leading-none hover:bg-gray-50"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

function ProjectModalContent({
  project,
  lightboxIndex,
  onOpenLightbox,
  onCloseLightbox,
  setLightboxIndex
}: {
  project: Project
  lightboxIndex: number | null
  onOpenLightbox: (i: number) => void
  onCloseLightbox: () => void
  setLightboxIndex: React.Dispatch<React.SetStateAction<number | null>>
}) {
  // ...

  return (
    <div>
      <h2 className="text-2xl font-semibold">{project.title}</h2>
      <p className="mt-1 text-sm text-gray-600">{project.location}</p>
      <p className="mt-2 text-gray-700">{project.summary}</p>

      {/* Grid of all photos */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {project.images?.map((src, i) => (
          <button
            key={i}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            onClick={() => onOpenLightbox(i)}
          >
            <Image src={src} alt={`${project.title} photo ${i + 1}`} fill className="object-cover transition group-hover:scale-[1.02]" sizes="(max-width:1024px) 100vw, 33vw" />
          </button>
        ))}
      </div>

      {/* Lightbox for a single photo */}
      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          index={lightboxIndex}
          setIndex={(i) => setLightboxIndex(() => i)}
          onClose={onCloseLightbox}
        />
      )}
    </div>
  )
}

function Lightbox({
  images,
  index,
  setIndex,
  onClose
}: {
  images: string[]
  index: number
  setIndex: (i: number) => void
  onClose: () => void
}) {
  const prev = () => setIndex((index - 1 + images.length) % images.length)
  const next = () => setIndex((index + 1) % images.length)

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4"
      onMouseDown={onBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-2xl text-white hover:bg-white/10"
      >
        ×
      </button>

      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 px-3 py-2 text-white hover:bg-white/10"
      >
        ‹
      </button>

      <div className="relative h-[80vh] w-[90vw] max-w-5xl">
        <Image
          src={images[index]}
          alt={`Photo ${index + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 px-3 py-2 text-white hover:bg-white/10"
      >
        ›
      </button>
    </div>
  )
}
