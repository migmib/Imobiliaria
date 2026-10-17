"use client"

import { useEffect, useRef } from "react"
import { ShineLogo } from "@/components/shine-logo"
import { site } from "@/lib/site"

// Símbolo do logo (W com a casa), sem caixa, no lado direito do hero (no celular fica embaixo do texto).
// - Fica DENTRO do layout do hero (não flutua por cima). Tamanho e brilho estão em components/hero.css.
// - O símbolo se inclina seguindo o cursor. Ele atualiza variáveis CSS direto no elemento,
//   sem passar pelo React, então não pesa.
// - O logo ganha um brilho dourado quando a página abre e quando você passa o mouse nele.
export function HeroBrandCard() {
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    let frame = 0

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        el.style.setProperty("--tilt-x", `${(-y * 12).toFixed(2)}deg`)
        el.style.setProperty("--tilt-y", `${(x * 14).toFixed(2)}deg`)
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <aside aria-label={site.name} className="hero-logo-card hero-enter" style={{ animationDelay: "0.5s" }}>
      <div ref={tiltRef} className="hero-brand-tilt hero-logo-mark">
        <ShineLogo
          src="/images/logo/logo-mark-hd.png"
          width={786}
          height={577}
          alt={site.name}
          intro
          priority
          className="block w-full"
          imgClassName="block h-auto w-full"
        />
      </div>
    </aside>
  )
}
