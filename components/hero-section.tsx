"use client"

import { useEffect, useRef } from "react"
import { PropertySearchForm } from "@/components/property-search-form"
import { AnimatedText } from "@/components/animated-text"
import { HeroBackground } from "@/components/hero-background"
import { HeroBrandCard } from "@/components/hero-brand-card"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Faz os textos "subirem" ao aparecer na tela.git
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // OBS: antes o fundo encolhia e arredondava ao rolar a página (um scroll listener que
  // atualizava o React a cada pixel e redimensionava o fundo animado). Isso pesava o site,
  // então foi removido: o fundo agora fica parado enquanto a página rola.

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Fundo animado em tela cheia (cores e legibilidade em components/hero-background.tsx) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <HeroBackground />
      </div>

      {/* Conteúdo: texto à esquerda, cartão da marca à direita (só em telas grandes) */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <HeroBrandCard />

        <div className="max-w-2xl">
          <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-background font-medium mb-6">
            Compra e aluguel de imóveis
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] text-background text-balance mb-8">
            <AnimatedText text="Encontre o lugar" delay={0.2} />
            <br />
            <span className="text-background/75">
              <AnimatedText text="perfeito para você" delay={0.6} />
            </span>
          </h1>
          <p className="reveal opacity-0 animation-delay-400 text-lg text-background/90 leading-relaxed mb-10 md:text-base mr-0 pr-0">
            Casas, apartamentos e terrenos selecionados com atendimento próximo do início ao fim da sua negociação.
          </p>
        </div>

        <div className="reveal opacity-0 animation-delay-600 mt-12 max-w-5xl">
          <PropertySearchForm variant="hero" />
        </div>
      </div>
    </section>
  )
}
