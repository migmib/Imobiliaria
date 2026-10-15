"use client"

import { useState } from "react"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site, whatsappLink } from "@/lib/site"

const interests = [
  "Quero comprar um imóvel",
  "Quero alugar um imóvel",
  "Quero vender ou anunciar meu imóvel",
  "Preciso de crédito imobiliário",
]

const fieldClass =
  "w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"

export function ContactSection() {
  const [name, setName] = useState("")
  const [interest, setInterest] = useState(interests[0])
  const [message, setMessage] = useState("")

  // Sem backend por enquanto: o formulário monta a mensagem e abre o WhatsApp.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = `Olá! Meu nome é ${name.trim()}. ${interest}.${message.trim() ? ` ${message.trim()}` : ""}`
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer")
  }

  const contacts = [
    { icon: MessageCircle, label: "WhatsApp", value: site.phone, href: whatsappLink() },
    { icon: Phone, label: "Telefone", value: site.phone, href: `tel:+${site.whatsapp}` },
    { icon: Mail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Endereço", value: site.address },
  ]

  return (
    <section id="contato" className="relative -mt-10 scroll-mt-16 rounded-t-[2.5rem] bg-muted py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <h2 className="font-serif text-4xl font-light leading-tight text-foreground text-balance md:text-6xl">
            Vamos conversar sobre o seu imóvel
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Conte o que você procura e a nossa equipe responde pelo WhatsApp.
          </p>

          <ul className="mt-10 space-y-5">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  {href ? (
                    <a href={href} className="text-foreground underline-offset-4 hover:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="text-foreground">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-border/50 bg-card p-6 shadow-lg shadow-primary/5 md:p-8">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
              Seu nome
            </label>
            <input id="contact-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Como podemos te chamar?" className={`${fieldClass} h-11`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-interest" className="text-sm font-medium text-foreground">
              Como podemos ajudar?
            </label>
            <select id="contact-interest" value={interest} onChange={(e) => setInterest(e.target.value)} className={`${fieldClass} h-11`}>
              {interests.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              Mensagem (opcional)
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Bairro, faixa de preço, prazo..."
              className={`${fieldClass} resize-none py-3`}
            />
          </div>

          <Button type="submit" size="lg" className="h-12 w-full rounded-full">
            <MessageCircle />
            Enviar pelo WhatsApp
          </Button>
        </form>
      </div>
    </section>
  )
}
