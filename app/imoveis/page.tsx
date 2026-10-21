import type { Metadata } from "next"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { PropertyResults } from "@/components/property-results"

export const metadata: Metadata = {
  title: "Imóveis à venda e para alugar | Willians & Adilson Imóveis",
  description: "Veja casas, apartamentos, terrenos e salas comerciais para comprar ou alugar.",
}

// Página estática: a lista e os filtros são montados no navegador (components/property-results.tsx).
export default function ImoveisPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Suspense é obrigatório quando o componente usa useSearchParams em site estático */}
      <Suspense fallback={<div className="mx-auto min-h-[60vh] max-w-7xl px-6 pb-24 pt-36 lg:px-8" />}>
        <PropertyResults />
      </Suspense>

      <Footer />
    </main>
  )
}
