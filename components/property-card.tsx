import Image from "next/image"
import Link from "next/link"
import { Bath, BedDouble, Car, MapPin, Ruler } from "lucide-react"
import { formatPrice, purposeLabels, typeLabels, type Property } from "@/lib/properties"

export function PropertyCard({ property }: { property: Property }) {
  const { slug, title, images, purpose, type, price, bedrooms, bathrooms, parking, area, neighborhood, city } = property

  const specs = [
    { icon: BedDouble, value: bedrooms, label: bedrooms === 1 ? "quarto" : "quartos" },
    { icon: Bath, value: bathrooms, label: bathrooms === 1 ? "banheiro" : "banheiros" },
    { icon: Car, value: parking, label: parking === 1 ? "vaga" : "vagas" },
  ].filter((s) => s.value > 0)

  return (
    <Link
      href={`/imoveis/${slug}`}
      className="group block h-full overflow-hidden rounded-3xl border border-border/50 bg-card shadow-lg shadow-primary/5 outline-none transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/10 focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
          {purposeLabels[purpose]}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
          {typeLabels[type]}
        </span>
      </div>

      <div className="p-6">
        <p className="font-serif text-2xl text-foreground">{formatPrice(price, purpose)}</p>
        <h3 className="mt-1 font-medium text-foreground">{title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {neighborhood}, {city}
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
          {specs.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="size-4" aria-hidden />
              <span>{value}</span>
              <span className="sr-only">{label}</span>
            </li>
          ))}
          <li className="flex items-center gap-1.5">
            <Ruler className="size-4" aria-hidden />
            <span>{area} m²</span>
          </li>
        </ul>
      </div>
    </Link>
  )
}
