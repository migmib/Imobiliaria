"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Um slide: a foto (ou null enquanto a foto ainda não existe), a letra que aparece no lugar dela
// e, se quiser, uma legenda por cima da foto.
export type CarouselSlide = {
  src: string | null
  alt: string
  initial: string
  title?: string
  subtitle?: string
}

// Carrossel com "scroll snap": no celular dá para arrastar com o dedo,
// no computador use as setas ou os pontinhos.
export function PhotoCarousel({
  slides,
  className,
  sizes = "(min-width: 768px) 40vw, 100vw",
  dots = "center",
}: {
  slides: CarouselSlide[]
  className?: string
  sizes?: string
  dots?: "center" | "left"
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  function goTo(i: number) {
    const el = trackRef.current
    if (!el) return
    const next = (i + slides.length) % slides.length
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" })
  }

  function handleScroll() {
    const el = trackRef.current
    if (!el) return
    setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  const arrow =
    "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground outline-none backdrop-blur-sm transition hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/50"

  return (
    <div className={cn("relative", className)}>
      <div ref={trackRef} onScroll={handleScroll} className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto rounded-3xl">
        {slides.map((slide, i) => (
          <div key={i} className="relative aspect-[4/5] min-w-full snap-center bg-muted">
            {slide.src ? (
              <Image src={slide.src} alt={slide.alt} fill sizes={sizes} className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center" aria-hidden>
                <span className="font-serif text-9xl font-light text-primary/25">{slide.initial}</span>
              </div>
            )}

            {slide.title && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-6 pb-12 pt-16 text-white">
                <p className="font-serif text-2xl font-light">{slide.title}</p>
                {slide.subtitle && <p className="mt-0.5 text-sm text-white/85">{slide.subtitle}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button type="button" onClick={() => goTo(index - 1)} aria-label="Foto anterior" className={cn(arrow, "left-4")}>
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="Próxima foto" className={cn(arrow, "right-4")}>
            <ChevronRight className="size-5" />
          </button>

          <div className={cn("absolute bottom-4 flex gap-2", dots === "left" ? "left-6" : "inset-x-0 justify-center")}>
            {slides.map((_, i) => (
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
  )
}
