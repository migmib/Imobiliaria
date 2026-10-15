// Dados da empresa em UM só lugar. Troque aqui e o site inteiro atualiza.
export const site = {
  name: "Imobiliaria",
  email: "contato@imobiliaria.com.br",
  phone: "(11) 90000-0000",
  whatsapp: "5511900000000", // só números, com 55 + DDD
  address: "São Paulo, SP",
}

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${site.whatsapp}${text}`
}
