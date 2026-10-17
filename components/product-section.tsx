"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { ScrollBlurText } from "@/components/scroll-blur-text"
import { Button } from "@/components/ui/button"
import { filterProperties, getCities, propertyTypes, type PropertyType, type Purpose } from "@/lib/properties"
import { cn } from "@/lib/utils"

const cities = getCities()

const purposes: { value: "" | Purpose; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "VENDA", label: "Comprar" },
  { value: "ALUGUEL", label: "Alugar" },
]

const chip = (active: boolean) =>
  cn(
    "rounded-full border px-4 py-2 text-sm outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40",
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
  )

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [purpose, setPurpose] = useState<"" | Purpose>("")
  const [type, setType] = useState<"" | PropertyType>("")
  const [city, setCity] = useState("")

  // Só os textos do topo usam a animação de entrada.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-up")
        })
      },
      { threshold: 0.1 },
    )
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // "base" respeita finalidade e tipo; serve para contar imóveis em cada região.
  const base = filterProperties({ purpose: purpose || undefined, type: type || undefined })
  const results = (city ? base.filter((p) => p.city === city) : base).sort((a, b) => Number(b.featured) - Number(a.featured))

  // O botão "Ver todos" leva para a listagem já com os mesmos filtros.
  const params = new URLSearchParams()
  if (purpose) params.set("purpose", purpose)
  if (type) params.set("type", type)
  if (city) params.set("city", city)
  const query = params.toString()
  const listHref = results.length > 0 && query ? `/imoveis?${query}` : "/imoveis"

  const hasFilters = Boolean(purpose || type || city)
  const listLabel =
    hasFilters && results.length > 0 ? `Ver ${results.length === 1 ? "o imóvel" : `os ${results.length} imóveis`}` : "Ver todos os imóveis"
  const clear = () => {
    setPurpose("")
    setType("")
    setCity("")
  }

  return (
    <section ref={sectionRef} id="imoveis" className="relative -mt-10 scroll-mt-16 rounded-t-[2.5rem] bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center lg:mb-16">
          <p className="reveal mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gold-deep opacity-0">Imóveis em destaque</p>
          <ScrollBlurText
            text="Encontre o seu próximo lar"
            className="mb-6 font-serif text-3xl font-light text-foreground text-balance md:text-7xl"
          />
          <p className="reveal animation-delay-400 mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground opacity-0">
            Escolha a região e o tipo de imóvel. Os resultados aparecem logo abaixo.
          </p>
        </div>

        {/* Caixa de filtros: 1) o que você quer, 2) tipo, 3) região, 4) resultado */}
        <div className="mx-auto mb-12 max-w-5xl rounded-3xl border border-border/60 bg-background p-5 shadow-lg shadow-primary/5 md:p-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-8">
            <div>
              <p id="purpose-label" className="mb-2 text-sm font-medium text-foreground">
                O que você procura?
              </p>
              <div className="grid w-full grid-cols-3 gap-1 rounded-full bg-muted p-1 md:w-auto" role="group" aria-labelledby="purpose-label">
                {purposes.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    aria-pressed={purpose === p.value}
                    onClick={() => setPurpose(p.value)}
                    className={cn(
                      "rounded-full px-6 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      purpose === p.value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="home-type" className="mb-2 block text-sm font-medium text-foreground">
                Tipo de imóvel
              </label>
              <select
                id="home-type"
                value={type}
                onChange={(e) => setType(e.target.value as "" | PropertyType)}
                className="h-12 w-full rounded-full border border-input bg-background px-5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:max-w-xs"
              >
                <option value="">Todos os tipos</option>
                {propertyTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-7">
            <p id="region-label" className="mb-2 text-sm font-medium text-foreground">
              Região
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="region-label">
              <button type="button" aria-pressed={city === ""} onClick={() => setCity("")} className={chip(city === "")}>
                Todas as regiões <span className="ml-1 opacity-70">{base.length}</span>
              </button>
              {cities.map((c) => {
                const count = base.filter((p) => p.city === c).length
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={city === c}
                    disabled={count === 0 && city !== c}
                    onClick={() => setCity(c)}
                    className={chip(city === c)}
                  >
                    {c} <span className="ml-1 opacity-70">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-foreground" aria-live="polite">
              <span className="font-serif text-3xl">{results.length}</span>{" "}
              <span className="text-muted-foreground">{results.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}</span>
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {hasFilters && (
                <button type="button" onClick={clear} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                  Limpar filtros
                </button>
              )}
              <Button asChild size="lg" className="group h-12 rounded-full px-8">
                <Link href={listHref}>
                  {listLabel}
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {results.length > 0 ? (
          <>
            {/* flex + justify-center: com 1 ou 2 resultados os cards ficam centralizados, não colados à esquerda */}
            <div className="flex flex-wrap justify-center gap-6">
              {results.slice(0, 6).map((property) => (
                <div key={property.id} className="w-full sm:w-[calc((100%_-_1.5rem)_/_2)] lg:w-[calc((100%_-_3rem)_/_3)]">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            {results.length > 6 && (
              <div className="mt-12 text-center">
                <Button asChild size="lg" variant="outline" className="group rounded-full px-8">
                  <Link href={listHref}>
                    Ver os outros {results.length - 6} imóveis
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-border px-6 py-16 text-center">
            <h3 className="font-serif text-2xl text-foreground">Nenhum imóvel com esses filtros</h3>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">Tente outra região ou outro tipo de imóvel.</p>
            <Button type="button" onClick={clear} className="mt-6 rounded-full px-6">
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
