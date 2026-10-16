import { site } from "@/lib/site"

// ============================================================================
// LOGO: quando tiver o arquivo da logo, salve em public/images/ (de preferência PNG com
// fundo transparente, em branco ou claro) e coloque o caminho aqui. Exemplo:
//   const LOGO_SRC = "/images/logo.png"
// Enquanto estiver vazio, o cartão mostra um ícone de casa + o nome do site.
// ============================================================================
const LOGO_SRC = ""

// Cartão "de vidro" no lado direito do topo do site (aparece a partir de telas grandes).
// O efeito de vidro é feito só com transparência, brilho e borda, SEM backdrop-blur:
// desfocar o fundo animado a cada quadro deixaria o site pesado.
export function HeroBrandCard() {
  return (
    <aside
      aria-label={site.name}
      className="reveal opacity-0 animation-delay-600 pointer-events-none absolute right-8 top-32 hidden w-72 xl:block"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-white/10 p-8 text-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]">
        {/* reflexo de vidro */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent" aria-hidden />

        <div className="relative">
          {LOGO_SRC ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={LOGO_SRC} alt={site.name} className="h-16 w-auto max-w-full object-contain object-left" />
          ) : (
            <>
              <span className="flex size-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15" aria-hidden>
                <svg viewBox="0 0 32 32" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15 16 5l12 10" />
                  <path d="M7 13.5V27h18V13.5" />
                  <path d="M13 27v-7a3 3 0 0 1 6 0v7" />
                </svg>
              </span>
              <p className="mt-6 font-serif text-3xl font-light">{site.name}</p>
            </>
          )}

          <p className="mt-3 text-sm leading-relaxed text-background/80">Do primeiro contato à entrega das chaves, com você.</p>

          <div className="my-6 h-px bg-white/25" aria-hidden />

          <ul className="flex flex-wrap gap-2 text-xs">
            {["Compra", "Venda", "Aluguel"].map((item) => (
              <li key={item} className="rounded-full border border-white/25 bg-white/10 px-3 py-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
