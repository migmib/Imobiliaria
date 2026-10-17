import { AnimatedText } from "@/components/animated-text"
import { HeroBackground } from "@/components/hero-background"
import { HeroBrandCard } from "@/components/hero-brand-card"
import { SectionLink } from "@/components/section-link"
import { Button } from "@/components/ui/button"
import { whatsappLink } from "@/lib/site"
import "./hero.css"

// Tela inicial: texto e botões à esquerda, símbolo do logo à direita (layout e animação em components/hero.css).
// A busca de imóveis fica na seção "Imóveis", logo abaixo.
export function HeroSection() {
  return (
    <section className="hero-section relative flex items-center overflow-hidden pt-20">
      {/* Fundo animado em tela cheia (cores e legibilidade em components/hero-background.tsx) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <HeroBackground />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="hero-grid">
          <div className="max-w-2xl">
            <p className="hero-enter text-sm uppercase tracking-[0.2em] text-gold font-medium mb-6">
              Compra e aluguel de imóveis
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] text-background text-balance mb-8">
              <AnimatedText text="Encontre o lugar" delay={0.2} />
              <br />
              <span className="text-gold">
                <AnimatedText text="perfeito para você" delay={0.6} />
              </span>
            </h1>
            <p
              className="hero-enter text-lg text-background/90 leading-relaxed mb-10 md:text-base"
              style={{ animationDelay: "0.4s" }}
            >
              Casas, apartamentos e terrenos selecionados com atendimento próximo do início ao fim da sua negociação.
            </p>

            <div className="hero-enter flex flex-wrap gap-4" style={{ animationDelay: "0.6s" }}>
              <Button asChild size="lg" className="h-12 rounded-full bg-gold px-8 font-medium text-primary hover:bg-gold/90">
                <SectionLink sectionId="imoveis">Ver imóveis</SectionLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={whatsappLink("Olá! Gostaria de falar com um corretor.")} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <HeroBrandCard />
        </div>
      </div>
    </section>
  )
}
