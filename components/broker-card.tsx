"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, MessageCircle, X } from "lucide-react"
import { PhotoCarousel, type CarouselSlide } from "@/components/photo-carousel"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { Broker } from "@/lib/brokers"
import { whatsappLink } from "@/lib/site"
import { cn } from "@/lib/utils"

export function BrokerCard({ broker, className }: { broker: Broker; className?: string }) {
  const [open, setOpen] = useState(false)
  const cover = broker.photos[0]
  const role = broker.creci ? `${broker.role} · ${broker.creci}` : broker.role
  const whatsapp = whatsappLink(broker.whatsappMessage)
  // Sem fotos ainda: 3 espaços reservados, só para mostrar como o carrossel vai ficar.
  const slides: CarouselSlide[] = (broker.photos.length > 0 ? broker.photos : [null, null, null]).map((src, i) => ({
    src,
    alt: `${broker.name} - foto ${i + 1}`,
    initial: broker.name[0],
  }))

  return (
    <>
      {/* broker-card: no computador o card "infla" ao passar o mouse e o botão Ver mais aparece (ver globals.css). */}
      <article className={cn("broker-card group flex h-full flex-col rounded-[2rem] border border-primary-foreground/15 bg-primary-foreground/5 p-6 md:p-8", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Ver mais sobre ${broker.name}`}
          className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-3xl bg-primary-foreground/10 outline-none focus-visible:ring-[3px] focus-visible:ring-primary-foreground/60"
        >
          {cover ? (
            <Image
              src={cover}
              alt={`Foto de ${broker.name}`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <span className="flex h-full items-center justify-center transition-transform duration-700 group-hover:scale-105" aria-hidden>
              <span className="font-serif text-9xl font-light text-primary-foreground/30">{broker.name[0]}</span>
            </span>
          )}
        </button>

        <h3 className="mt-8 font-serif text-4xl font-light">{broker.name}</h3>
        <p className="mt-1 text-accent">{role}</p>
        <p className="mt-5 max-w-md flex-1 leading-relaxed text-primary-foreground/80">{broker.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-full bg-primary-foreground px-7 text-primary hover:bg-primary-foreground/90">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Falar com {broker.name}
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setOpen(true)}
            className="broker-more h-12 rounded-full border-primary-foreground/30 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            Ver mais
          </Button>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="max-h-[92vh] gap-0 overflow-y-auto rounded-3xl p-0 duration-300 sm:max-w-5xl md:h-[min(46rem,90vh)] md:overflow-hidden">
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Fechar"
              className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-background/95 text-foreground shadow-md outline-none transition hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <X className="size-5" />
            </button>
          </DialogClose>

          {/* No computador a foto fica centralizada na vertical e só o texto da direita rola. */}
          <div className="grid md:h-full md:min-h-0 md:grid-cols-[1fr_1.1fr] md:grid-rows-[minmax(0,1fr)]">
            <div className="p-4 md:flex md:items-center md:justify-center md:p-8">
              {/* max-w: a foto (proporção 4/5) nunca fica mais alta que o modal */}
              <PhotoCarousel slides={slides} className="w-full md:mx-auto md:max-w-[min(100%,calc((min(46rem,90vh)_-_4rem)_*_0.8))]" />
            </div>

            <div className="p-6 md:overflow-y-auto md:p-10 md:pl-4">
              <DialogTitle className="font-serif text-4xl font-light leading-tight md:text-5xl">{broker.name}</DialogTitle>
              <DialogDescription className="mt-2 text-base text-primary">{role}</DialogDescription>

              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                {broker.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <h4 className="mt-10 font-serif text-2xl text-foreground">Como funciona o trabalho</h4>
              <ol className="mt-5 space-y-5">
                {broker.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{step.title}</p>
                      <p className="text-muted-foreground">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h4 className="mt-10 font-serif text-2xl text-foreground">Como ajuda você</h4>
              <ul className="mt-4 space-y-3">
                {broker.services.map((service) => (
                  <li key={service} className="flex items-start gap-3 text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {service}
                  </li>
                ))}
              </ul>

              <Button asChild size="lg" className="mt-10 h-12 w-full rounded-full">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  Falar com {broker.name} no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
