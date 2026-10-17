// Dados de EXEMPLO (códigos, endereços e coordenadas também são de exemplo). Na Fase 2 estas funções passam a buscar no banco (Prisma),
// mas o resto do site continua igual, porque só usa estas funções.

export type PropertyType = "CASA" | "APARTAMENTO" | "TERRENO" | "COMERCIAL"
export type Purpose = "VENDA" | "ALUGUEL"
export type Sort = "recentes" | "menor-preco" | "maior-preco"

export type Property = {
  id: string
  code: string // código do imóvel: o número que o cliente cita ao falar com o corretor (ex.: "1001")
  slug: string
  title: string
  description: string
  price: number // em reais, sem centavos
  type: PropertyType
  purpose: Purpose
  bedrooms: number
  bathrooms: number
  parking: number
  area: number // m²
  city: string
  neighborhood: string
  address?: string // rua e número (ex.: "Rua Saturnino Pereira, 459"). Aparece no anúncio e posiciona o mapa. Se ficar vazio, mostra só o bairro.
  lat?: number // latitude: usada para calcular a distância até a pessoa
  lng?: number // longitude
  images: string[]
  features: string[]
  featured: boolean
  createdAt: string
}

export type Filters = {
  purpose?: Purpose
  type?: PropertyType
  city?: string
  q?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  sort?: Sort
}

export const purposeLabels: Record<Purpose, string> = { VENDA: "Venda", ALUGUEL: "Aluguel" }

export const typeLabels: Record<PropertyType, string> = {
  CASA: "Casa",
  APARTAMENTO: "Apartamento",
  TERRENO: "Terreno",
  COMERCIAL: "Comercial",
}

export const propertyTypes = (Object.keys(typeLabels) as PropertyType[]).map((value) => ({
  value,
  label: typeLabels[value],
}))

export function formatPrice(price: number, purpose: Purpose) {
  const value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price)
  return purpose === "ALUGUEL" ? `${value}/mês` : value
}

// Fotos de exemplo: troque por fotos reais em public/images/
const photos = [
  "/images/product-equilibrium.png",
  "/images/product-serenity.png",
  "/images/product-vitality.png",
  "/images/hero-biometic.png",
  "/images/mission-background.png",
]
const gallery = (start: number) => Array.from({ length: 5 }, (_, i) => photos[(start + i) % photos.length])

const properties: Property[] = [
  {
    id: "1", code: "1001", slug: "casa-com-piscina-jardins", title: "Casa com piscina e jardim", price: 2800000,
    type: "CASA", purpose: "VENDA", bedrooms: 4, bathrooms: 3, parking: 3, area: 320,
    city: "São Paulo", neighborhood: "Jardins", address: "Alameda Lorena, 1200", lat: -23.5646, lng: -46.658, images: gallery(0), featured: true, createdAt: "2026-09-28",
    description: "Casa ampla em rua tranquila, com jardim, piscina e área gourmet integrada à sala. Acabamento de alto padrão e muita luz natural.",
    features: ["Piscina", "Área gourmet", "Jardim", "Armários planejados", "Segurança 24h", "Ar-condicionado"],
  },
  {
    id: "2", code: "1002", slug: "apartamento-moderno-pinheiros", title: "Apartamento moderno com varanda", price: 6500,
    type: "APARTAMENTO", purpose: "ALUGUEL", bedrooms: 2, bathrooms: 2, parking: 1, area: 85,
    city: "São Paulo", neighborhood: "Pinheiros", address: "Rua dos Pinheiros, 850", lat: -23.567, lng: -46.701, images: gallery(1), featured: true, createdAt: "2026-09-25",
    description: "Apartamento reformado a poucos passos do metrô, com varanda gourmet e cozinha integrada. Condomínio com academia e coworking.",
    features: ["Varanda gourmet", "Academia", "Coworking", "Portaria 24h", "Aceita pets"],
  },
  {
    id: "3", code: "1003", slug: "terreno-condominio-cotia", title: "Terreno plano em condomínio fechado", price: 450000,
    type: "TERRENO", purpose: "VENDA", bedrooms: 0, bathrooms: 0, parking: 0, area: 600,
    city: "Cotia", neighborhood: "Granja Viana", address: "Avenida São Camilo, 500", lat: -23.6, lng: -46.84, images: gallery(2), featured: true, createdAt: "2026-09-20",
    description: "Terreno plano de esquina em condomínio com infraestrutura completa, pronto para construir. Documentação em dia.",
    features: ["Esquina", "Segurança 24h", "Área de lazer", "Ruas asfaltadas"],
  },
  {
    id: "4", code: "1004", slug: "cobertura-duplex-moema", title: "Cobertura duplex com terraço", price: 3450000,
    type: "APARTAMENTO", purpose: "VENDA", bedrooms: 3, bathrooms: 4, parking: 3, area: 210,
    city: "São Paulo", neighborhood: "Moema", address: "Avenida Ibirapuera, 2500", lat: -23.601, lng: -46.665, images: gallery(3), featured: true, createdAt: "2026-09-18",
    description: "Cobertura duplex com terraço e vista livre, a duas quadras do Parque Ibirapuera. Três suítes e lavabo.",
    features: ["Terraço", "Vista livre", "3 suítes", "Lavabo", "Lazer completo"],
  },
  {
    id: "5", code: "1005", slug: "casa-condominio-alphaville", title: "Casa em condomínio fechado", price: 1950000,
    type: "CASA", purpose: "VENDA", bedrooms: 3, bathrooms: 3, parking: 4, area: 240,
    city: "Barueri", neighborhood: "Alphaville", address: "Alameda Rio Negro, 500", lat: -23.489, lng: -46.851, images: gallery(4), featured: true, createdAt: "2026-09-10",
    description: "Casa térrea em condomínio com clube, quintal gramado e espaço para piscina. Ideal para famílias.",
    features: ["Quintal", "Clube", "Segurança 24h", "Churrasqueira", "Quadra esportiva"],
  },
  {
    id: "6", code: "1006", slug: "studio-vila-madalena", title: "Studio mobiliado", price: 3200,
    type: "APARTAMENTO", purpose: "ALUGUEL", bedrooms: 1, bathrooms: 1, parking: 0, area: 38,
    city: "São Paulo", neighborhood: "Vila Madalena", address: "Rua Aspicuelta, 300", lat: -23.553, lng: -46.691, images: gallery(1), featured: true, createdAt: "2026-09-05",
    description: "Studio completo e mobiliado, perto de bares, cafés e transporte. Pronto para morar.",
    features: ["Mobiliado", "Lavanderia", "Rooftop", "Aceita pets"],
  },
  {
    id: "7", code: "1007", slug: "sala-comercial-itaim", title: "Sala comercial no Itaim Bibi", price: 12000,
    type: "COMERCIAL", purpose: "ALUGUEL", bedrooms: 0, bathrooms: 1, parking: 2, area: 95,
    city: "São Paulo", neighborhood: "Itaim Bibi", address: "Rua João Cachoeira, 800", lat: -23.585, lng: -46.677, images: gallery(2), featured: false, createdAt: "2026-08-28",
    description: "Sala comercial em edifício corporativo, com recepção, copa e piso elevado. Entrega imediata.",
    features: ["Recepção", "Copa", "Piso elevado", "Ar-condicionado central"],
  },
  {
    id: "8", code: "1008", slug: "casa-terrea-campinas", title: "Casa térrea com quintal", price: 4800,
    type: "CASA", purpose: "ALUGUEL", bedrooms: 3, bathrooms: 2, parking: 2, area: 150,
    city: "Campinas", neighborhood: "Taquaral", address: "Avenida Heitor Penteado, 1000", lat: -22.885, lng: -47.053, images: gallery(3), featured: false, createdAt: "2026-08-20",
    description: "Casa térrea perto da Lagoa do Taquaral, com quintal e edícula. Bairro arborizado e silencioso.",
    features: ["Quintal", "Edícula", "Churrasqueira", "Aceita pets"],
  },
  {
    id: "9", code: "1009", slug: "apartamento-familia-santo-andre", title: "Apartamento para família", price: 780000,
    type: "APARTAMENTO", purpose: "VENDA", bedrooms: 3, bathrooms: 2, parking: 2, area: 98,
    city: "Santo André", neighborhood: "Jardim", address: "Rua das Figueiras, 500", lat: -23.658, lng: -46.531, images: gallery(0), featured: false, createdAt: "2026-08-12",
    description: "Apartamento de três quartos em condomínio com playground e salão de festas, perto de escolas e mercados.",
    features: ["Playground", "Salão de festas", "2 vagas", "Portaria 24h"],
  },
]

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

// Regiões (cidades) que têm imóveis, da que tem mais para a que tem menos.
export function getCities() {
  const counts = new Map<string, number>()
  properties.forEach((p) => counts.set(p.city, (counts.get(p.city) ?? 0) + 1))
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name)
}

export function getFeaturedProperties() {
  return properties.filter((p) => p.featured)
}

export function getPropertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug)
}

export function getRelatedProperties(property: Property, limit = 3) {
  return properties.filter((p) => p.slug !== property.slug && p.purpose === property.purpose).slice(0, limit)
}

export function filterProperties(filters: Filters) {
  const q = filters.q ? normalize(filters.q) : ""
  const result = properties.filter((p) => {
    if (filters.purpose && p.purpose !== filters.purpose) return false
    if (filters.type && p.type !== filters.type) return false
    if (filters.city && normalize(p.city) !== normalize(filters.city)) return false
    if (filters.minPrice && p.price < filters.minPrice) return false
    if (filters.maxPrice && p.price > filters.maxPrice) return false
    if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false
    if (q && !normalize(`${p.code} ${p.title} ${p.city} ${p.neighborhood}`).includes(q)) return false
    return true
  })
  if (filters.sort === "menor-preco") result.sort((a, b) => a.price - b.price)
  else if (filters.sort === "maior-preco") result.sort((a, b) => b.price - a.price)
  else result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return result
}

type SearchParams = Record<string, string | string[] | undefined>
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)
const toNumber = (v?: string) => {
  const n = Number(v)
  return v && Number.isFinite(n) && n > 0 ? n : undefined
}

// Transforma a URL (?type=CASA&maxPrice=500000) em filtros seguros.
export function parseFilters(sp: SearchParams): Filters {
  const purpose = first(sp.purpose)
  const type = first(sp.type)
  const sort = first(sp.sort)
  return {
    purpose: purpose === "VENDA" || purpose === "ALUGUEL" ? purpose : undefined,
    type: propertyTypes.find((t) => t.value === type)?.value,
    city: first(sp.city)?.trim() || undefined,
    q: first(sp.q)?.trim() || undefined,
    minPrice: toNumber(first(sp.minPrice)),
    maxPrice: toNumber(first(sp.maxPrice)),
    bedrooms: toNumber(first(sp.bedrooms)),
    sort: sort === "menor-preco" || sort === "maior-preco" ? sort : "recentes",
  }
}
