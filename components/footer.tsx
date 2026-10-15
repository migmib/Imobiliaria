import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { SectionLink } from "@/components/section-link"
import { site } from "@/lib/site"

const footerLinks = {
  imoveis: [
    { label: "Casas", href: "/imoveis?type=CASA" },
    { label: "Apartamentos", href: "/imoveis?type=APARTAMENTO" },
    { label: "Terrenos", href: "/imoveis?type=TERRENO" },
    { label: "Todos os imóveis", href: "/imoveis" },
  ],
  empresa: [
    { label: "Quem somos", href: "/#quem-somos" },
    { label: "Corretores", href: "/#corretores" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Trabalhe conosco", href: "#" },
  ],
  ajuda: [
    { label: "Fale conosco", href: "/#contato" },
    { label: "Crédito imobiliário", href: "/#corretores" },
  ],
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className = "text-sm text-background/70 hover:text-background transition-colors"
  if (href.startsWith("/#")) {
    return (
      <SectionLink sectionId={href.slice(2)} className={className}>
        {children}
      </SectionLink>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="relative -mt-10 rounded-t-[2.5rem] bg-foreground pb-16 pt-24 text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                <span className="text-foreground font-serif text-sm font-medium">I</span>
              </div>
              <span className="font-serif text-xl font-medium text-background">Imobiliaria</span>
            </Link>
            <p className="text-background/70 leading-relaxed mb-6 max-w-sm">
              Casas, apartamentos e terrenos para comprar ou alugar, com atendimento de confiança.
            </p>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>{site.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>{site.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>{site.address}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-background mb-4">Imóveis</h4>
            <ul className="space-y-3">
              {footerLinks.imoveis.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-background mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-background mb-4">Ajuda</h4>
            <ul className="space-y-3">
              {footerLinks.ajuda.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">© 2026 Imobiliaria. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm text-background/50">
            <Link href="#" className="hover:text-background transition-colors">
              Aviso legal
            </Link>
            <Link href="#" className="hover:text-background transition-colors">
              Política de privacidade
            </Link>
            <Link href="#" className="hover:text-background transition-colors">
              Termos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
