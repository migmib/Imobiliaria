"use client"

import { useState } from "react"
import { ExternalLink, LoaderCircle, LocateFixed, MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export function PropertyLocation({ title, neighborhood, city, address, lat, lng }: Props) {
  const [distance, setDistance] = useState<Distance>({ state: "idle" })

  const hasCoords = typeof lat === "number" && typeof lng === "number"
  const exact = Boolean(address)
  // O Google entende tanto coordenadas quanto endereço escrito.
  const place = hasCoords ? `${lat},${lng}` : `${address ?? neighborhood}, ${city}, Brasil`
  const q = encodeURIComponent(place)

  const mapEmbed = `https://www.google.com/maps?q=${q}&z=${exact ? 16 : 14}&hl=pt-BR&output=embed`
  const mapOpen = `https://www.google.com/maps/search/?api=1&query=${q}`
  const mapRoute = `https://www.google.com/maps/dir/?api=1&destination=${q}` // sem "origin": o Google usa a localização de quem clica

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

  return (
    <section className="mt-12" aria-labelledby="localizacao-titulo">
      <h2 id="localizacao-titulo" className="font-serif text-2xl text-foreground">
        Localização
      </h2>

      <div className="mt-4 overflow-hidden rounded-3xl border border-border/60 bg-card">
        {/* Endereço */}
        <div className="flex items-start gap-3 p-5">
          <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <div>
            {exact ? (
              <>
                <p className="text-foreground">{address}</p>
                <p className="font-semibold text-foreground">
                  {neighborhood} - {city}
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-foreground">
                  {neighborhood} - {city}
                </p>
                <p className="text-sm text-muted-foreground">Localização aproximada. O endereço completo é passado no atendimento.</p>
              </>
            )}
          </div>
        </div>

        {/* Mapa: clicar em qualquer ponto abre o Google Maps */}
        <div className="group relative aspect-[16/10] w-full bg-muted sm:aspect-[21/9]">
          <iframe
            src={mapEmbed}
            title={`Mapa: ${title}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 size-full border-0"
          />
          <a
            href={mapOpen}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir a localização no Google Maps (abre em nova aba)"
            className="absolute inset-0 flex items-end justify-start p-4 outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/60"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-sm font-medium text-foreground shadow-md transition-transform group-hover:scale-105">
              <ExternalLink className="size-4" aria-hidden />
              Abrir no Google Maps
            </span>
          </a>
        </div>

        {/* Distância e rota */}
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-10 text-sm" aria-live="polite">
            {distance.state === "ok" ? (
              <>
                <p className="text-foreground">
                  Você está a <strong className="font-semibold">{formatDistance(distance.km)}</strong> deste imóvel{" "}
                  <span className="text-muted-foreground">(em linha reta)</span>
                </p>
                <p className="mt-0.5 text-muted-foreground">Toque em "Como chegar" para ver o trajeto e o tempo de viagem.</p>
              </>
            ) : distance.state === "error" ? (
              <p className="text-destructive">{distance.message}</p>
            ) : hasCoords ? (
              <p className="text-muted-foreground">Descubra a que distância o imóvel fica de você. Sua localização não é enviada nem guardada.</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            {hasCoords && (
              <Button type="button" variant="outline" className="h-11 rounded-full" onClick={locate} disabled={distance.state === "loading"}>
                {distance.state === "loading" ? <LoaderCircle className="animate-spin" /> : <LocateFixed />}
                {distance.state === "ok" ? "Calcular de novo" : "Ver distância de mim"}
              </Button>
            )}
            <Button asChild className="h-11 rounded-full">
              <a href={mapRoute} target="_blank" rel="noopener noreferrer">
                <Navigation />
                Como chegar
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
