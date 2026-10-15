"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps, MouseEvent } from "react"

type Props = Omit<ComponentProps<typeof Link>, "href"> & { sectionId: string }

// Link para uma seção da home. Se você já está na home, rola suavemente até ela
// (o Link padrão do Next pula "seco"). Em outras páginas, navega normalmente para /#secao.
export function SectionLink({ sectionId, onClick, ...props }: Props) {
  const pathname = usePathname()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0
    if (pathname !== "/" || modified || e.defaultPrevented) return

    const target = document.getElementById(sectionId)
    if (!target) return

    e.preventDefault()
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
    window.history.replaceState(null, "", `#${sectionId}`)
  }

  return <Link {...props} href={`/#${sectionId}`} onClick={handleClick} />
}
