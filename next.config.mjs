// Publicação no GitHub Pages: site estático dentro de /NOME-DO-REPOSITORIO.
// Fora do GitHub Actions (npm run dev na sua máquina) o basePath fica vazio.
const repo = "Imobiliaria"
const basePath = process.env.GITHUB_ACTIONS === "true" ? `/${repo}` : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
