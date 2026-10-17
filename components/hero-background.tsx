"use client"

import { useEffect, useRef, useState } from "react"
import { GrainGradient } from "@paper-design/shaders-react"

// ============================================================================
// CORES DO FUNDO: quando for trocar a paleta do site, mude só estas duas linhas.
// ============================================================================
const COLOR_BACK = "hsl(224, 80%, 7%)" // cor de base (azul-marinho bem escuro)
const COLORS = ["hsl(222, 88%, 26%)", "hsl(217, 92%, 44%)", "hsl(228, 85%, 20%)"] // só tons de azul (do escuro ao mais vivo)

// Fundo animado do hero. Ele já inclui a camada escura que garante a leitura do texto:
// não importa quais cores você escolher acima, o título e a busca continuam legíveis.
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  // Economiza bateria e processador: a animação pausa quando o hero sai da tela.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0" style={{ backgroundColor: COLOR_BACK }} aria-hidden>
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack={COLOR_BACK}
        softness={0.76}
        intensity={0.45}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={visible ? 1 : 0}
        colors={COLORS}
      />

      {/* Camadas de legibilidade: escurecem o fundo, mais forte onde fica o texto (à esquerda) */}
      <div className="absolute inset-0 bg-black/20 lg:bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/12 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  )
}
