"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import Image from "next/image"
import { Building2, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { officePhotos } from "@/lib/office"
import { cn } from "@/lib/utils"
import "./office-gallery.css"

// Enquanto não há fotos em lib/office.ts, aparecem estes espaços reservados.
const placeholders = ["Recepção", "Sala de atendimento", "Sala de reuniões", "Nosso espaço"]

const arrow =
  "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground outline-none backdrop-blur-sm transition hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/50"

export function OfficeGallery() {
  const photos = officePhotos
  const hasPhotos = photos.length > 0
  const count = hasPhotos ? photos.length : placeholders.length

  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0) // slide visível no carrossel
  const [open, setOpen] = useState(false) // visualizador em tela cheia
  const [viewer, setViewer] = useState(0) // foto aberta no visualizador

  const caption = hasPhotos ? photos[index]?.caption : placeholders[index]

  function goTo(i: number) {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: ((i + count) % count) * el.clientWidth, behavior: "smooth" })
  }

  function handleScroll() {
    const el = trackRef.current
    if (!el) return
    setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  function openViewer(i: number) {
    setViewer(i)
    setOpen(true)
  }

  // Ao fechar, o carrossel volta para a foto em que você estava no visualizador.
  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      requestAnimationFrame(() => {
        const el = trackRef.current
        if (el) el.scrollTo({ left: viewer * el.clientWidth })
      })
    }
  }

  const step = (direction: number) => setViewer((v) => (v + direction + photos.length) % photos.length)
  const shown = photos[viewer]

  return (
    <>
      <div className="office-frame relative">
        <div ref={trackRef} onScroll={handleScroll} className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto rounded-[2rem]">
          {Array.from({ length: count }, (_, i) => {
            const photo = hasPhotos ? photos[i] : null
            return photo ? (
              <button
                key={photo.src}
                type="button"
                onClick={() => openViewer(i)}
                aria-label={`Ver foto completa: ${photo.caption ?? photo.alt}`}
                className="office-slide relative block aspect-[4/5] min-w-full cursor-zoom-in snap-center overflow-hidden bg-muted outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50"
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </button>
            ) : (
              <div key={i} className="flex aspect-[4/5] min-w-full snap-center flex-col items-center justify-center gap-3 bg-muted text-primary/30" aria-hidden>
                <Building2 className="size-20" strokeWidth={1} />
                <span className="font-serif text-xl">Foto do escritório</span>
              </div>
            )
          })}
        </div>

        {caption && (
          <p className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
            {caption}
          </p>
        )}

        {hasPhotos && (
          <span className="office-hint pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm sm:px-4">
            <Maximize2 className="size-4" aria-hidden />
            <span className="hidden sm:inline">Ver foto completa</span>
          </span>
        )}

        {count > 1 && (
          <>
            <button type="button" onClick={() => goTo(index - 1)} aria-label="Foto anterior" className={cn(arrow, "left-4")}>
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => goTo(index + 1)} aria-label="Próxima foto" className={cn(arrow, "right-4")}>
              <ChevronRight className="size-5" />
            </button>

            <div className="absolute bottom-4 left-6 z-10 flex gap-2">
              {Array.from({ length: count }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir para a foto ${i + 1}`}
                  aria-current={i === index}
                  className={cn("h-2 rounded-full bg-background/90 transition-all", i === index ? "w-6" : "w-2 opacity-60")}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasPhotos && (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent
            showCloseButton={false}
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "ArrowLeft") step(-1)
              if (e.key === "ArrowRight") step(1)
            }}
            className="flex h-[92vh] w-[96vw] max-w-none flex-col gap-0 overflow-hidden rounded-3xl border-0 bg-neutral-950 p-0 text-white duration-300 sm:max-w-none"
          >
            <DialogTitle className="sr-only">Fotos do escritório</DialogTitle>
            <DialogDescription className="sr-only">Use as setas do teclado ou os botões para trocar de foto.</DialogDescription>

            <DialogClose asChild>
              <button
                type="button"
                aria-label="Fechar"
                className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-white/15 text-white outline-none backdrop-blur-sm transition hover:bg-white/25 focus-visible:ring-[3px] focus-visible:ring-white/50"
              >
                <X className="size-5" />
              </button>
            </DialogClose>

            {/* A foto aparece inteira (object-contain), sem cortes. */}
            <div className="relative min-h-0 flex-1">
              <Image key={shown.src} src={shown.src} alt={shown.alt} fill sizes="96vw" className="object-contain" />

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Foto anterior"
                    className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white outline-none backdrop-blur-sm transition hover:bg-white/25 focus-visible:ring-[3px] focus-visible:ring-white/50"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Próxima foto"
                    className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white outline-none backdrop-blur-sm transition hover:bg-white/25 focus-visible:ring-[3px] focus-visible:ring-white/50"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm">
                <span className="font-medium">{shown.caption ?? shown.alt}</span>
                <span className="ml-3 text-white/60">
                  {viewer + 1} / {photos.length}
                </span>
              </p>

              {photos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {photos.map((photo, i) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setViewer(i)}
                      aria-label={`Ver foto ${i + 1}`}
                      aria-current={i === viewer}
                      className={cn(
                        "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg outline-none transition focus-visible:ring-[3px] focus-visible:ring-white/50",
                        i === viewer ? "ring-2 ring-white" : "opacity-50 hover:opacity-100",
                      )}
                    >
                      <Image src={photo.src} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
