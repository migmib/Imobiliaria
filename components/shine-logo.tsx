import Image from "next/image"
import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import "./logo.css"

// Logo com brilho dourado ao passar o mouse (veja components/logo.css).
// Os arquivos ficam em public/images/logo/. Para trocar o logo, substitua os PNGs mantendo os nomes.
export function ShineLogo({
  src,
  width,
  height,
  alt,
  className,
  imgClassName = "block h-full w-auto",
  intro = false,
  priority = false,
}: {
  src: string
  width: number
  height: number
  alt: string
  className?: string
  imgClassName?: string
  intro?: boolean
  priority?: boolean
}) {
  return (
    <span className={cn("logo-shine", intro && "logo-shine--intro", className)} style={{ "--logo-mask": `url(${src})` } as CSSProperties}>
      <Image src={src} width={width} height={height} alt={alt} priority={priority} className={imgClassName} />
    </span>
  )
}
