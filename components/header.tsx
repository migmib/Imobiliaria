"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <nav className="max-w-7xl mx-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between h-20 px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            
            <span className="font-serif text-foreground text-2xl font-normal">Imobiliaria</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="#imoveis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Imóveis
            </Link>
            <Link href="#diferenciais" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Diferenciais
            </Link>
            <Link href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Depoimentos
            </Link>
            <Link href="#sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sobre nós
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
              Fale conosco
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 px-6 lg:px-8 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link
                href="#imoveis"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Imóveis
              </Link>
              <Link
                href="#diferenciais"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Diferenciais
              </Link>
              <Link
                href="#depoimentos"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Depoimentos
              </Link>
              <Link
                href="#sobre"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sobre nós
              </Link>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full mt-4">
                Fale conosco
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
