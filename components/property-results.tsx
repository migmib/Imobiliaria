"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PropertyCard } from "@/components/property-card"
import { PropertySearchForm } from "@/components/property-search-form"
import { Button } from "@/components/ui/button"
import { filterProperties, parseFilters } from "@/lib/properties"

// No GitHub Pages o site é estático (não existe servidor para ler a URL),
// então os filtros são lidos aqui, no navegador, a partir de ?type=CASA&maxPrice=500000.
export function PropertyResults() {
  const searchParams = useSearchParams()
  const filters = parseFilters(Object.fromEntries(searchParams.entries()))
  const results = filterProperties(filters)

  const title =
    filters.purpose === "VENDA" ? "Imóveis para comprar" : filters.purpose === "ALUGUEL" ? "Imóveis para alugar" : "Todos os imóveis"

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8">
      <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl">{title}</h1>
      <p className="mt-3 text-muted-foreground">
        {results.length} {results.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[320px_1fr]">
        <aside>
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-lg shadow-primary/5 lg:sticky lg:top-32">
            <h2 className="mb-5 font-serif text-xl text-foreground">Filtrar imóveis</h2>
            <PropertySearchForm key={searchParams.toString()} variant="page" defaults={filters} />
          </div>
        </aside>

        <section aria-label="Resultados">
          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
              <h2 className="font-serif text-2xl text-foreground">Nenhum imóvel encontrado</h2>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Tente aumentar o preço máximo ou remover algum filtro.
              </p>
              <Button asChild className="mt-6 rounded-full px-6">
                <Link href="/imoveis">Limpar filtros</Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
