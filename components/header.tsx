"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { SectionLink } from "@/components/section-link"
import { ShineLogo } from "@/components/shine-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { site, whatsappLink } from "@/lib/site"

// Cada item aponta para uma seção da home (o "id" da seção).
const links = [
  { id: "imoveis", label: "Imóveis" },
  { id: "quem-somos", label: "Quem somos" },
  { id: "corretores", label: "Corretores" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
]

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Menu fica mais compacto depois que a página rola um pouco.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // "Scroll spy": descobre qual seção está no meio da tela.
  useEffect(() => {
    if (!isHome) {
      setActive(pathname.startsWith("/imoveis") ? "imoveis" : null)
      return
    }

    const elements = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    elements.forEach((el) => observer.observe(el))

    // No topo da página (hero) nenhum item fica marcado.
    const onScroll = () => {
      const first = document.getElementById(links[0].id)
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [isHome, pathname])

  // Posição da "pílula" que desliza atrás do item ativo.
  useEffect(() => {
    const measure = () => {
      const el = active ? listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null
      setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [active])

  return (
    <header className={cn("fixed left-0 right-0 top-0 z-50 transition-[padding] duration-300", scrolled ? "p-3" : "p-6")}>
      <nav className="mx-auto max-w-7xl rounded-3xl border border-gold/20 bg-primary/90 text-primary-foreground shadow-lg shadow-black/20 backdrop-blur-md">
        <div className={cn("flex items-center justify-between px-6 transition-[height] duration-300 lg:px-8", scrolled ? "h-16" : "h-20")}>
          <Link href="/" aria-label={site.name} className="flex items-center gap-3">
            <ShineLogo
              src="/images/logo/logo-mark.png"
              width={200}
              height={148}
              alt=""
              priority
              className={cn("transition-[height] duration-300", scrolled ? "h-8" : "h-10")}
            />
            <span className="flex flex-col leading-none">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] sm:text-[0.82rem] sm:tracking-[0.2em]">
                Willians <span className="text-gold">&</span> Adilson
              </span>
              <span className="mt-1.5 text-[0.58rem] uppercase tracking-[0.5em] text-gold sm:text-[0.62rem]">Imóveis</span>
            </span>
          </Link>

          <div ref={listRef} className="relative hidden items-center lg:flex">
            <span
              aria-hidden
              className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-gold/15 transition-[left,width,opacity] duration-500 ease-out"
              style={{ left: indicator?.left ?? 0, width: indicator?.width ?? 0, opacity: indicator ? 1 : 0 }}
            />
            {links.map((link) => (
              <SectionLink
                key={link.id}
                sectionId={link.id}
                data-id={link.id}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "relative px-4 py-2 text-sm transition-colors",
                  active === link.id ? "font-medium text-gold" : "text-primary-foreground/70 hover:text-primary-foreground",
                )}
              >
                {link.label}
              </SectionLink>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button asChild className="rounded-full bg-gold px-6 font-medium text-primary hover:bg-gold/90">
              <a href={whatsappLink("Olá! Gostaria de falar com um corretor.")} target="_blank" rel="noopener noreferrer">
                Fale conosco
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="p-2 text-primary-foreground lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-white/10 px-6 py-6 lg:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <SectionLink
                  key={link.id}
                  sectionId={link.id}
                  onClick={() => setIsOpen(false)}
                  className={cn("text-lg transition-colors", active === link.id ? "font-medium text-gold" : "text-primary-foreground/70 hover:text-primary-foreground")}
                >
                  {link.label}
                </SectionLink>
              ))}
              <Button asChild className="mt-4 w-full rounded-full bg-gold font-medium text-primary hover:bg-gold/90">
                <a href={whatsappLink("Olá! Gostaria de falar com um corretor.")} target="_blank" rel="noopener noreferrer">
                  Fale conosco
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
