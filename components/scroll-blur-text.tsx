"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollBlurTextProps {
  text: string
  className?: string
  startBlur?: number
  endBlur?: number
}

export function ScrollBlurText({ text, className = "", startBlur = 80, endBlur = 0 }: ScrollBlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [wordProgress, setWordProgress] = useState<number[]>([])

  const words = text.split(" ")

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // 0 quando o título entra pela base da tela; 1 quando ele chega na metade da tela.
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.5)))

      // Cada palavra começa um pouco depois da anterior, mas a ÚLTIMA sempre termina em 1.
      // (Antes o atraso passava de 1 e a última palavra ficava borrada para sempre.)
      const fade = 0.4 // "tamanho" da transição de cada palavra
      const stagger = words.length > 1 ? (1 - fade) / (words.length - 1) : 0

      const newProgress = words.map((_, index) => {
        const start = index * stagger
        return Math.max(0, Math.min(1, (scrollProgress - start) / fade))
      })

      setWordProgress(newProgress)
    }

    handleScroll() // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [words.length])

  return (
    <h2 ref={containerRef} className={className}>
      {words.map((word, index) => {
        const progress = wordProgress[index] || 0
        const blur = startBlur - (startBlur - endBlur) * progress
        const opacity = progress

        return (
          <span
            key={index}
            style={{
              filter: blur > 0.05 ? `blur(${blur}px)` : "none",
              opacity,
              display: "inline-block",
              transition: "filter 0.3s ease-out, opacity 0.3s ease-out",
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        )
      })}
    </h2>
  )
}
