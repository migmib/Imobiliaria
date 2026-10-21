import { withBase } from "@/lib/base-path"

// Fotos do escritório (seção "Quem somos").
//
// COMO ADICIONAR:
// 1) Salve as fotos em public/images/escritorio/ (ex.: recepcao.jpg)
// 2) Descomente/copie uma linha abaixo para cada foto:
//    - src: caminho da foto, começando com /images/escritorio/
//    - alt: descreve a foto (para leitores de tela e Google)
//    - caption: legenda curta que aparece em cima da foto (opcional)
//
// Enquanto a lista estiver vazia, o site mostra espaços reservados no lugar das fotos.
export type OfficePhoto = {
  src: string
  alt: string
  caption?: string
}

export const officePhotos: OfficePhoto[] = [
   { src: "/images/escritorio/FOTO1.jpeg", alt: "Recepção do escritório", caption: "Recepção" },
   { src: "/images/escritorio/FOTO2.jpeg", alt: "Sala de atendimento aos clientes", caption: "Sala de atendimento" },
   { src: "/images/escritorio/FOTO3.jpeg", alt: "Sala de reuniões", caption: "Sala de reuniões" },
].map((photo) => ({ ...photo, src: withBase(photo.src) }))
