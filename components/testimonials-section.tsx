"use client"

import { useState } from "react"
import { Pause, Play } from "lucide-react"

// EXEMPLOS: troque por depoimentos reais de clientes antes de publicar o site.
const testimonials = [
  { quote: "Encontrei meu apartamento em duas semanas. O atendimento foi atencioso do começo ao fim.", author: "Mariana L.", role: "Comprou um apartamento" },
  { quote: "Processo transparente e sem burocracia. Recomendo a Imobiliaria para quem quer segurança no aluguel.", author: "Thiago D.", role: "Alugou uma casa" },
  { quote: "Como investidora, valorizo a análise de mercado. Todas as indicações foram certeiras.", author: "Sofia M.", role: "Investidora" },
  { quote: "Vendi minha casa rápido e pelo preço que eu esperava. Excelente equipe.", author: "Lucas P.", role: "Vendeu uma casa" },
  { quote: "Fui muito bem orientada na compra do meu primeiro imóvel. Me senti segura em todas as etapas.", author: "Clara B.", role: "Primeiro imóvel" },
]

// A lista é repetida 4x: o CSS desloca a faixa em -50% (duas listas) e recomeça,
// então o movimento nunca "pula" nem acaba.
const loop = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

// OBS: de propósito NÃO desligamos a animação com "prefers-reduced-motion".
// No Windows, "Mostrar animações" desativado fazia o carrossel ficar parado. Quem precisa de calma
// tem o botão de pausar (e o mouse por cima também pausa).
const css = `
@keyframes testimonials-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.testimonials-marquee {
  overflow: hidden;
  /* respiro em cima/embaixo: sem isso o card inchado seria cortado pelo overflow */
  padding-block: 1.5rem;
  margin-block: -1.5rem;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
}
.testimonials-track {
  display: flex;
  width: max-content;
  animation: testimonials-marquee 60s linear infinite;
}
.testimonials-marquee:hover .testimonials-track,
.testimonials-marquee:focus-within .testimonials-track,
.testimonials-marquee[data-paused="true"] .testimonials-track {
  animation-play-state: paused;
}

/* O card sob o mouse "infla" (mesmo efeito dos cards dos corretores). */
.testimonial-card {
  transition:
    transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s ease;
}
@media (hover: hover) {
  .testimonial-card:hover {
    transform: scale(1.06);
    z-index: 10;
    box-shadow: 0 25px 50px -15px rgb(0 0 0 / 0.25);
  }
}
`

function Card({ item, hidden }: { item: (typeof testimonials)[number]; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="testimonial-card relative mr-5 flex h-[17rem] w-[18rem] shrink-0 flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 shadow-lg shadow-primary/5 md:mr-6 md:h-[18rem] md:w-[22rem] md:p-8"
    >
      <blockquote className="font-serif text-lg font-light leading-snug text-foreground md:text-xl">{item.quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-primary" aria-hidden>
          {item.author[0]}
        </span>
        <span className="text-sm">
          <span className="block font-medium text-foreground">{item.author}</span>
          <span className="text-muted-foreground">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function TestimonialsSection() {
  const [paused, setPaused] = useState(false)

  return (
    <section id="depoimentos" className="relative -mt-10 scroll-mt-16 overflow-hidden rounded-t-[2.5rem] bg-background py-24 lg:py-32">
      <style>{css}</style>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div>
          <h2 className="font-serif text-4xl font-light text-foreground text-balance md:text-6xl">Quem já encontrou o seu lugar</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Histórias de quem comprou, alugou e vendeu com a gente. Passe o mouse para pausar.</p>
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:self-auto"
        >
          {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
          {paused ? "Continuar" : "Pausar"}
        </button>
      </div>

      <div className="testimonials-marquee mt-14" data-paused={paused}>
        <div className="testimonials-track">
          {loop.map((item, i) => (
            <Card key={i} item={item} hidden={i >= testimonials.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
