import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { PropertyCard } from "@/components/property-card"
import { PropertySearchForm } from "@/components/property-search-form"
import { Button } from "@/components/ui/button"
import { filterProperties, parseFilters } from "@/lib/properties"

export const metadata: Metadata = {
  title: "Imóveis à venda e para alugar | Willians & Adilson Imóveis",
  description: "Veja casas, apartamentos, terrenos e salas comerciais para comprar ou alugar.",
}

// No Next 16, searchParams chega como Promise: por isso o "await".
export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const filters = parseFilters(await searchParams)
  const results = filterProperties(filters)

  const title =
    filters.purpose === "VENDA" ? "Imóveis para comprar" : filters.purpose === "ALUGUEL" ? "Imóveis para alugar" : "Todos os imóveis"

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8">
        <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl">{title}</h1>
        <p className="mt-3 text-muted-foreground">
          {results.length} {results.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside>
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-lg shadow-primary/5 lg:sticky lg:top-32">
              <h2 className="mb-5 font-serif text-xl text-foreground">Filtrar imóveis</h2>
              <PropertySearchForm variant="page" defaults={filters} />
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

      <Footer />
    </main>
  )
}
