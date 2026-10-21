// No GitHub Pages o site mora em /Imobiliaria, então caminhos "/images/..." precisam do prefixo.
// Use withBase("/images/foto.jpg") em qualquer src/action escrito à mão.
// (Link do Next e router já colocam o prefixo sozinhos.)
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export const withBase = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path)
