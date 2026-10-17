"use client"

import { useState } from "react"
import { ExternalLink, LoaderCircle, LocateFixed, MapPin, MousePointerClick, Navigation, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
  title: string
  neighborhood: string
  city: string
  address?: string
  lat?: number
  lng?: number
}

type Distance = { state: "idle" } | { state: "loading" } | { state: "ok"; km: number } | { state: "error"; message: string }

// Distância em linha reta entre dois pontos (fórmula de Haversine).
function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const toRad = (d: number) => (d * Math.PI) / 180
  const R = 6371 // raio da Terra em km
  const dLat = toRad(bLat - aLat)
  const dLng = toRad(bLng - aLng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function formatDistance(km: number) {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: km < 10 ? 1 : 0 }).format(km)} km`
}

// Desenho decorativo de "ruas" para o fundo do cartão (não é um mapa de verdade: o mapa real abre ao clicar).
// Assim a página não carrega o mapa do Google até a pessoa querer ver.
function StreetsBackground() {
  return (
    <svg className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-105" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path d="M-20 215 C 120 160 260 240 420 150 S 700 70 840 110 L 840 150 C 700 120 560 200 430 215 S 150 290 -20 255 Z" className="fill-primary/10" />
      <g fill="none" strokeLinecap="round" className="stroke-white">
        <path d="M-10 60 C 150 90 300 30 460 70 S 700 40 820 20" strokeWidth="14" />
        <path d="M130 -10 C 170 80 120 170 190 270" strokeWidth="14" />
        <path d="M520 -10 C 500 70 560 150 520 270" strokeWidth="12" />
        <path d="M-10 150 C 120 130 220 170 330 140" strokeWidth="8" />
        <path d="M600 110 C 680 130 760 120 830 170" strokeWidth="8" />
        <path d="M300 -10 L 340 270" strokeWidth="6" />
        <path d="M690 -10 L 650 270" strokeWidth="6" />
        <path d="M-10 105 L 830 95" strokeWidth="5" />
        <path d="M60 -10 L 20 270" strokeWidth="5" />
        <path d="M410 190 L 800 230" strokeWidth="5" />
      </g>
    </svg>
  )
}

export function PropertyLocation({ title, neighborhood, city, address, lat, lng }: Props) {
  const [distance, setDistance] = useState<Distance>({ state: "idle" })
  const [mapOpen, setMapOpen] = useState(false)

  const hasCoords = typeof lat === "number" && typeof lng === "number"
  const exact = Boolean(address)
  const areaLine = `${neighborhood} - ${city}`

  // Com endereço (rua e número), o Google acha o ponto pelo texto. Sem endereço, usamos as coordenadas
  // (o bairro). lat/lng servem também para calcular a distância.
  const place = address ? `${address}, ${neighborhood}, ${city}, Brasil` : hasCoords ? `${lat},${lng}` : `${neighborhood}, ${city}, Brasil`
  const q = encodeURIComponent(place)

  const mapEmbed = `https://www.google.com/maps?q=${q}&z=${exact ? 17 : 14}&hl=pt-BR&output=embed`
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${q}`
  const mapRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}` // sem "origin": o Google usa a localização de quem clica

  function locate() {
    if (!hasCoords) return
    if (!("geolocation" in navigator)) {
      setDistance({ state: "error", message: "Seu navegador não permite descobrir a localização." })
      return
    }
    setDistance({ state: "loading" })
    navigator.geolocation.getCurrentPosition(
      (pos) => setDistance({ state: "ok", km: distanceKm(pos.coords.latitude, pos.coords.longitude, lat!, lng!) }),
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? "Você não autorizou o acesso à localização. Libere nas configurações do navegador e tente de novo."
            : err.code === err.TIMEOUT
              ? "Demorou demais para achar sua localização. Tente de novo."
              : "Não foi possível descobrir sua localização agora."
        setDistance({ state: "error", message })
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    )
  }

  const outlineOnDark =
    "h-12 rounded-full border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"

  return (
    <section id="localizacao" className="mt-12 scroll-mt-32" aria-labelledby="localizacao-titulo">
      <h2 id="localizacao-titulo" className="font-serif text-2xl text-foreground">
        Endereço do imóvel
      </h2>

      {/* 1) Cartão do mapa: clicar nele abre o mapa grande. O botão "Abrir no Google Maps" é separado. */}
      <div className="group relative mt-4 min-h-52 overflow-hidden rounded-3xl border border-border/60 bg-secondary">
        <StreetsBackground />

        <button
          type="button"
          onClick={() => setMapOpen(true)}
          aria-label="Abrir o mapa para navegar"
          className="absolute inset-0 cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/60"
        />

        <div className="pointer-events-none relative flex min-h-52 flex-col justify-center gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div className="flex max-w-md items-start gap-3 rounded-2xl bg-background p-5 shadow-lg shadow-primary/10">
            <MapPin className="mt-0.5 size-6 shrink-0 text-gold-deep" aria-hidden />
            <div>
              {exact ? (
                <>
                  <p className="text-foreground">{address}</p>
                  <p className="font-semibold text-foreground">{areaLine}</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-foreground">{areaLine}</p>
                  <p className="text-sm text-muted-foreground">Localização aproximada. O endereço completo é passado no atendimento.</p>
                </>
              )}
            </div>
          </div>

          <p className="flex items-center gap-3 font-medium text-foreground/80 transition-colors group-hover:text-foreground sm:pr-4">
            <MousePointerClick className="size-7" aria-hidden />
            Clique para navegar no mapa
          </p>
        </div>

        <a
          href={mapOpenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-md outline-none transition-transform hover:scale-105 focus-visible:ring-[3px] focus-visible:ring-ring/60"
        >
          <ExternalLink className="size-4" aria-hidden />
          Abrir no Google Maps
        </a>
      </div>

      {/* 2) Distância: painel azul, separado, para ninguém deixar passar */}
      <div className="mt-4 flex flex-col gap-6 rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg shadow-primary/20 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4" aria-live="polite">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10">
            <Route className="size-6 text-gold" aria-hidden />
          </span>

          {distance.state === "ok" ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <p className="text-sm text-primary-foreground/75">Você está a</p>
              <p className="font-serif text-5xl leading-tight text-gold">{formatDistance(distance.km)}</p>
              <p className="text-sm text-primary-foreground/75">deste imóvel, em linha reta. Toque em "Como chegar" para ver o trajeto e o tempo.</p>
            </div>
          ) : distance.state === "loading" ? (
            <div>
              <p className="font-serif text-2xl">Buscando sua localização…</p>
              <p className="mt-1 text-sm text-primary-foreground/75">Se o navegador pedir permissão, toque em "Permitir".</p>
            </div>
          ) : distance.state === "error" ? (
            <div>
              <p className="font-serif text-2xl">Não deu para calcular</p>
              <p className="mt-1 max-w-md text-sm text-primary-foreground/80">{distance.message}</p>
            </div>
          ) : hasCoords ? (
            <div>
              <p className="font-serif text-2xl">Qual a distância até você?</p>
              <p className="mt-1 max-w-md text-sm text-primary-foreground/75">
                Calculamos a distância em linha reta entre o imóvel e o lugar onde você está. Sua localização não é enviada nem guardada.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-serif text-2xl">Como chegar</p>
              <p className="mt-1 max-w-md text-sm text-primary-foreground/75">Veja o trajeto até o imóvel a partir de onde você está.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:min-w-56">
          {hasCoords && (
            <Button
              type="button"
              onClick={locate}
              disabled={distance.state === "loading"}
              className="h-12 rounded-full bg-gold px-6 font-semibold text-primary hover:bg-gold/90"
            >
              {distance.state === "loading" ? <LoaderCircle className="animate-spin" /> : <LocateFixed />}
              {distance.state === "ok" ? "Calcular de novo" : "Calcular distância"}
            </Button>
          )}
          <Button asChild variant="outline" className={outlineOnDark}>
            <a href={mapRouteUrl} target="_blank" rel="noopener noreferrer">
              <Navigation />
              Como chegar
            </a>
          </Button>
        </div>
      </div>

      {/* 3) Janela com o mapa grande e interativo (só carrega quando abre) */}
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="gap-0 overflow-hidden rounded-3xl p-0 sm:max-w-4xl">
          <DialogHeader className="border-b border-border/60 px-6 py-4 pr-14">
            <DialogTitle className="font-serif text-xl font-normal">Localização do imóvel</DialogTitle>
            <DialogDescription className="text-sm">{exact ? `${address} · ${areaLine}` : areaLine}</DialogDescription>
          </DialogHeader>

          <div className="h-[min(65vh,34rem)] w-full bg-muted">
            <iframe
              src={mapEmbed}
              title={`Mapa: ${title}`}
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="size-full border-0"
            />
          </div>

          <DialogFooter className="flex-row flex-wrap justify-end gap-3 border-t border-border/60 px-6 py-4">
            <Button asChild variant="outline" className="rounded-full">
              <a href={mapOpenUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                Abrir no Google Maps
              </a>
            </Button>
            <Button asChild className="rounded-full">
              <a href={mapRouteUrl} target="_blank" rel="noopener noreferrer">
                <Navigation />
                Como chegar
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
