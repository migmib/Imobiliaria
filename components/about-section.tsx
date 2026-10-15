import { PhotoCarousel } from "@/components/photo-carousel"
import { brokerSlides } from "@/lib/brokers"

const values = [
  { title: "Transparência", text: "Você conhece cada etapa, custo e prazo antes de decidir." },
  { title: "Atendimento próximo", text: "Conversa direta, do primeiro contato até a entrega das chaves." },
  { title: "Segurança na negociação", text: "A documentação é conferida antes de o imóvel chegar até você." },
]

export function AboutSection() {
  return (
    <section id="quem-somos" className="relative -mt-10 scroll-mt-16 rounded-t-[2.5rem] bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-20 lg:px-8">
        <div className="relative">
          {/* Carrossel com as fotos do Williams e do Adilson (vem de lib/brokers.ts) */}
          <PhotoCarousel slides={brokerSlides()} dots="left" sizes="(min-width: 1024px) 40vw, 100vw" className="[&>div:first-child]:rounded-[2rem]" />
          <p className="mt-4 max-w-[17rem] rounded-2xl bg-primary p-5 font-serif text-lg leading-snug text-primary-foreground shadow-xl lg:absolute lg:-bottom-6 lg:-right-6 lg:mt-0">
            Do primeiro contato à entrega das chaves, com você.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-4xl font-light leading-tight text-foreground text-balance md:text-6xl">
            Quem somos
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Somos uma imobiliária que trabalha de perto com cada cliente. Acreditamos que encontrar o lugar certo vai
            além de metros quadrados: envolve segurança, qualidade de vida e um novo começo.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Por isso reunimos quem entende de imóveis e quem entende de crédito, para que você decida com tranquilidade.
          </p>

          <dl className="mt-10 divide-y divide-border border-y border-border">
            {values.map((v) => (
              <div key={v.title} className="grid gap-1 py-5 sm:grid-cols-[210px_1fr] sm:gap-6">
                <dt className="font-serif text-xl text-foreground">{v.title}</dt>
                <dd className="text-muted-foreground">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
