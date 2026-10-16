import Image from "next/image"
import { cn } from "@/lib/utils"

// Mostra a foto INTEIRA, sem cortar nada, seja ela vertical, horizontal ou quadrada.
// O espaço que sobra nas laterais (ou em cima e embaixo) é preenchido com a própria
// foto bem desfocada, então o resultado fica agradável em qualquer formato.
//
// O tamanho da moldura vem de quem usa (ex.: className="aspect-square").
export function FittedImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string
  alt: string
  sizes: string
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {/* Fundo: a mesma foto, ampliada e desfocada (decorativa, por isso alt vazio) */}
      <Image src={src} alt="" aria-hidden fill sizes="64px" className="scale-125 object-cover opacity-70 blur-2xl" />
      {/* Frente: a foto completa */}
      <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
    </div>
  )
}
