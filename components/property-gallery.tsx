"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const go = (step: number) => setActive((i) => (i + step + images.length) % images.length)

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${title} - foto ${active + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground outline-none backdrop-blur-sm transition hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground outline-none backdrop-blur-sm transition hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="absolute bottom-4 right-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl outline-none transition focus-visible:ring-[3px] focus-visible:ring-ring/50",
                i === active ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
