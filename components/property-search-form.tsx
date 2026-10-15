import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getCities, propertyTypes, type Filters } from "@/lib/properties"

type Props = {
  variant?: "hero" | "page"
  defaults?: Filters
}

const fieldClass =
  "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

// Formulário GET comum: ao enviar, o navegador vai para /imoveis?purpose=...&type=...
// Não precisa de JavaScript, e o resultado já fica na URL (dá para compartilhar o link).
export function PropertySearchForm({ variant = "page", defaults = {} }: Props) {
  const hero = variant === "hero"
  const purposes = [
    ...(hero ? [] : [{ value: "", label: "Todos" }]),
    { value: "VENDA", label: "Comprar" },
    { value: "ALUGUEL", label: "Alugar" },
  ]
  const purposeDefault = defaults.purpose ?? (hero ? "VENDA" : "")

  return (
    <form
      action="/imoveis"
      method="get"
      className={cn(hero ? "rounded-3xl bg-background/95 p-4 shadow-2xl backdrop-blur-md md:p-5" : "flex flex-col gap-5")}
    >
      <fieldset className="flex w-fit gap-1 rounded-full bg-muted p-1">
        <legend className="sr-only">Finalidade</legend>
        {purposes.map((p) => (
          <label key={p.value} className="cursor-pointer">
            <input type="radio" name="purpose" value={p.value} defaultChecked={purposeDefault === p.value} className="peer sr-only" />
            <span className="block rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50">
              {p.label}
            </span>
          </label>
        ))}
      </fieldset>

      <div className={cn(hero ? "mt-4 grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-end" : "flex flex-col gap-4")}>
        <Field label={hero ? "Cidade ou bairro" : "Bairro ou palavra-chave"} htmlFor={`${variant}-q`}>
          <input id={`${variant}-q`} name="q" defaultValue={defaults.q} placeholder="Ex.: Pinheiros" className={fieldClass} />
        </Field>

        {!hero && (
          <Field label="Região" htmlFor="page-city">
            <select id="page-city" name="city" defaultValue={defaults.city ?? ""} className={fieldClass}>
              <option value="">Todas as regiões</option>
              {getCities().map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label="Tipo de imóvel" htmlFor={`${variant}-type`}>
          <select id={`${variant}-type`} name="type" defaultValue={defaults.type ?? ""} className={fieldClass}>
            <option value="">Todos os tipos</option>
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        {hero ? (
          <Field label="Preço máximo (R$)" htmlFor="hero-maxPrice">
            <input id="hero-maxPrice" name="maxPrice" type="number" min={0} inputMode="numeric" placeholder="Sem limite" className={fieldClass} />
          </Field>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Preço mínimo" htmlFor="page-minPrice">
                <input id="page-minPrice" name="minPrice" type="number" min={0} inputMode="numeric" defaultValue={defaults.minPrice} placeholder="R$" className={fieldClass} />
              </Field>
              <Field label="Preço máximo" htmlFor="page-maxPrice">
                <input id="page-maxPrice" name="maxPrice" type="number" min={0} inputMode="numeric" defaultValue={defaults.maxPrice} placeholder="R$" className={fieldClass} />
              </Field>
            </div>
            <Field label="Quartos" htmlFor="page-bedrooms">
              <select id="page-bedrooms" name="bedrooms" defaultValue={defaults.bedrooms ?? ""} className={fieldClass}>
                <option value="">Qualquer quantidade</option>
                <option value="1">1 ou mais</option>
                <option value="2">2 ou mais</option>
                <option value="3">3 ou mais</option>
                <option value="4">4 ou mais</option>
              </select>
            </Field>
            <Field label="Ordenar por" htmlFor="page-sort">
              <select id="page-sort" name="sort" defaultValue={defaults.sort ?? "recentes"} className={fieldClass}>
                <option value="recentes">Mais recentes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
            </Field>
          </>
        )}

        <Button type="submit" size="lg" className="h-11 rounded-xl px-6">
          <Search />
          {hero ? "Buscar imóveis" : "Aplicar filtros"}
        </Button>
      </div>

      {!hero && (
        <Link href="/imoveis" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Limpar filtros
        </Link>
      )}
    </form>
  )
}
