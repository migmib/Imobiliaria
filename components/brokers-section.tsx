import { BrokerCard } from "@/components/broker-card"
import { brokers } from "@/lib/brokers"

export function BrokersSection() {
  return (
    <section id="corretores" className="relative -mt-10 scroll-mt-16 rounded-t-[2.5rem] bg-primary py-24 text-primary-foreground lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl font-light leading-tight text-balance md:text-6xl">Quem cuida do seu negócio</h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
            Um corretor para encontrar o imóvel e um especialista em crédito para viabilizar o financiamento. Você
            conversa com os dois no mesmo lugar.
          </p>
        </div>

        {/* items-stretch + h-full no card: os dois ficam sempre do mesmo tamanho e alinhados */}
        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-2">
          {brokers.map((broker) => (
            <BrokerCard key={broker.id} broker={broker} />
          ))}
        </div>
      </div>
    </section>
  )
}
