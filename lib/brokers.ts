// Dados dos corretores. Edite aqui: textos, fotos e (se quiser) CRECI.
//
// FOTOS: salve as imagens em public/images/corretores/ e liste os caminhos em "photos".
// A primeira foto vira a capa do card; todas aparecem no carrossel do "Ver mais".
// Exemplo: photos: ["/images/corretores/williams/foto-1.jpg"]
export type BrokerStep = { title: string; text: string }

export type Broker = {
  id: string
  name: string
  role: string
  summary: string
  about: string[]
  steps: BrokerStep[]
  services: string[]
  whatsappMessage: string
  photos: string[]
  creci?: string
}

export const brokers: Broker[] = [
  {
    id: "williams",
    name: "Williams",
    role: "Corretor de imóveis",
    summary: "Acompanha você na compra, na venda e no aluguel, da primeira visita até a assinatura do contrato.",
    about: [
      "Williams atua na compra, na venda e no aluguel de imóveis. Ele acompanha cada negociação de perto, para que a sua decisão seja tranquila e segura.",
      "O atendimento é direto: você conversa com ele desde o primeiro contato até a assinatura do contrato.",
    ],
    steps: [
      { title: "Conversa inicial", text: "Entende o que você procura: região, tamanho, orçamento e prazo." },
      { title: "Seleção e visitas", text: "Apresenta os imóveis que combinam com o seu perfil e agenda as visitas." },
      { title: "Negociação", text: "Conduz a conversa com o proprietário para chegar a um bom acordo." },
      { title: "Documentação e fechamento", text: "Confere a documentação e acompanha a assinatura do contrato." },
    ],
    services: [
      "Compra e venda de imóveis",
      "Aluguel residencial e comercial",
      "Visitas e negociação com o proprietário",
      "Orientação sobre o valor de mercado do imóvel",
    ],
    whatsappMessage: "Olá, Williams! Vi o site da Imobiliaria e gostaria de conversar sobre um imóvel.",
    photos: ["/images/corretores/Willians/williams-1.jpeg", "/images/corretores/Willians/ClientesWIL_1.jpeg",  "/images/corretores/Willians/ClientesWIL_2.jpeg", "/images/corretores/Willians/ClientesWIL3.jpeg"],
  },
  {
    id: "adilson",
    name: "Adilson",
    role: "Avaliação de crédito imobiliário",
    summary: "Analisa a sua situação financeira e mostra o caminho mais seguro para conseguir o financiamento do imóvel.",
    about: [
      "Adilson cuida da parte financeira da negociação. Ele analisa o seu perfil de crédito, apresenta as opções de financiamento e organiza tudo para o processo ser mais simples.",
      "É o caminho ideal para quem quer saber, antes de escolher o imóvel, quanto pode financiar e qual parcela cabe no orçamento.",
    ],
    steps: [
      { title: "Análise do perfil", text: "Avalia renda, histórico de crédito e capacidade de pagamento." },
      { title: "Simulação", text: "Mostra valores de entrada, parcelas e prazos possíveis." },
      { title: "Documentação", text: "Lista e organiza os documentos necessários para o pedido de financiamento." },
      { title: "Acompanhamento", text: "Acompanha a análise do banco até a resposta final." },
    ],
    services: [
      "Análise de crédito para financiamento",
      "Simulação de entrada e parcelas",
      "Organização da documentação",
      "Orientação sobre FGTS e subsídios",
    ],
    whatsappMessage: "Olá, Adilson! Vi o site da Imobiliaria e gostaria de avaliar meu crédito para financiar um imóvel.",
    photos: [],
  },
]

// Slides para os carrosséis. Cada corretor entra com todas as fotos dele;
// enquanto não houver foto, entra um espaço reservado com a inicial do nome.
export function brokerSlides(list: Broker[] = brokers) {
  return list.flatMap((b) => {
    const photos: (string | null)[] = b.photos.length > 0 ? b.photos : [null]
    return photos.map((src, i) => ({
      src,
      alt: `Foto de ${b.name}${photos.length > 1 ? ` (${i + 1})` : ""}`,
      initial: b.name[0],
      title: b.name,
      subtitle: b.role,
    }))
  })
}
