"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

// Mostra "Código 1001" com um botão para copiar. O cliente usa esse número para
// falar do imóvel com o corretor (por WhatsApp, telefone ou pessoalmente).
export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Sem permissão para copiar: não faz nada (o número continua visível na tela).
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title="Copiar código do imóvel"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {copied ? <Check className="size-4 text-primary" aria-hidden /> : <Copy className="size-4 text-muted-foreground" aria-hidden />}
      <span>
        Código <strong className="font-semibold">{code}</strong>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Código copiado" : ""}
      </span>
      {copied && (
        <span className="text-xs text-primary" aria-hidden>
          Copiado!
        </span>
      )}
    </button>
  )
}
