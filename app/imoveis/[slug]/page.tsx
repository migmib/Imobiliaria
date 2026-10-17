import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Bath, BedDouble, Car, Check, MapPin, MessageCircle, Phone, Ruler } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { PropertyCard } from "@/components/property-card"
import { PropertyGallery } from "@/components/property-gallery"
import { Button } from "@/components/ui/button"
import { formatPrice, getPropertyBySlug, getRelatedProperties, purposeLabels, typeLabels } from "@/lib/properties"
import { site, whatsappLink } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) return { title: "Imóvel não encontrado | Willians & Adilson Imóveis" }
  return {
    title: `${property.title} em ${property.neighborhood} | Willians & Adilson Imóveis`,
    description: property.description,
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) notFound() // mostra a página 404

  const related = getRelatedProperties(property)

  const specs = [
    { icon: BedDouble, label: "Quartos", value: property.bedrooms, unit: "" },
    { icon: Bath, label: "Banheiros", value: property.bathrooms, unit: "" },
    { icon: Car, label: "Vagas", value: property.parking, unit: "" },
    { icon: Ruler, label: "Área", value: property.area, unit: " m²" },
  ].filter((s) => s.value > 0)

  const message = `Olá! Tenho interesse no imóvel "${property.title}" (${property.neighborhood}). Ainda está disponível?`

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8">
        <Link href="/imoveis" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" />
          Voltar para os imóveis
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <PropertyGallery images={property.images} title={property.title} />

            <div className="mt-10">
              <p className="text-sm text-muted-foreground">
                {typeLabels[property.type]} para {property.purpose === "VENDA" ? "comprar" : "alugar"}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-light text-foreground md:text-5xl">{property.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" />
                {property.neighborhood}, {property.city}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {specs.map(({ icon: Icon, label, value, unit }) => (
                <div key={label} className="rounded-2xl border border-border/50 bg-card p-4">
                  <Icon className="size-5 text-primary" aria-hidden />
                  <dd className="mt-3 font-serif text-2xl text-foreground">
                    {value}
                    {unit}
                  </dd>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                </div>
              ))}
            </dl>

            <section className="mt-12">
              <h2 className="font-serif text-2xl text-foreground">Sobre o imóvel</h2>
              <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">{property.description}</p>
            </section>

            <section className="mt-12">
              <h2 className="font-serif text-2xl text-foreground">Características</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-foreground">
                    <Check className="size-4 text-primary" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside>
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-lg shadow-primary/5 lg:sticky lg:top-32">
              <p className="text-sm text-muted-foreground">{purposeLabels[property.purpose]}</p>
              <p className="mt-1 font-serif text-4xl text-foreground">{formatPrice(property.price, property.purpose)}</p>

              <div className="mt-6 flex flex-col gap-3">
                <Button asChild size="lg" className="h-12 rounded-full">
                  <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle />
                    Falar no WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full">
                  <a href={`tel:+${site.whatsapp}`}>
                    <Phone />
                    Ligar agora
                  </a>
                </Button>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Atendimento de segunda a sábado. Agende uma visita e tire suas dúvidas com a nossa equipe.
              </p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-3xl font-light text-foreground">Você também pode gostar</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}
