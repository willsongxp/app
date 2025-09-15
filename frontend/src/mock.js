// Mock data for RW Estratégia Digital website

export const companyInfo = {
  name: "RW Estratégia Digital",
  tagline: "Transforme sua presença digital com a RW Estratégia Digital",
  subtitle: "Sites que vendem e IAs de WhatsApp que convertem",
  logo: "https://customer-assets.emergentagent.com/job_smart-web-rw/artifacts/pgie18xy_logo.jpg",
  contact: {
    whatsapp: "https://api.whatsapp.com/send?phone=48999376241",
    instagram: "https://www.instagram.com/rw_0ficial/",
    email: "testgyminspirebyaquiles@gmail.com"
  }
};

export const services = [
  {
    id: 1,
    type: "site",
    name: "Sites Institucionais",
    price: "R$ 849,90",
    description: "Sites informativos profissionais",
    features: [
      "Design responsivo e moderno",
      "Otimização para mecanismos de busca (SEO)",
      "Integração com redes sociais",
      "Formulário de contato integrado",
      "Hospedagem por 12 meses inclusa"
    ],
    popular: false
  },
  {
    id: 2,
    type: "site",
    name: "Sites E-commerce",
    price: "R$ 1.279,90",
    description: "Lojas virtuais completas",
    features: [
      "Catálogo de produtos ilimitado",
      "Sistema de pagamento integrado",
      "Painel de controle administrativo",
      "Relatórios de vendas e estoque",
      "Suporte técnico especializado"
    ],
    popular: true
  },
  {
    id: 3,
    type: "ai",
    name: "IA WhatsApp Iniciante",
    setupPrice: "R$ 1.349,90",
    monthlyPrice: "R$ 277,00",
    description: "Automação básica para atendimento",
    features: [
      "Atendimento automatizado 24/7",
      "Respostas personalizadas",
      "Integração com catálogo de produtos",
      "Relatórios básicos de conversação",
      "Suporte na configuração inicial"
    ],
    popular: false
  },
  {
    id: 4,
    type: "ai",
    name: "IA WhatsApp Pro",
    setupPrice: "R$ 1.849,90",
    monthlyPrice: "R$ 357,00",
    description: "Solução completa de IA conversacional",
    features: [
      "IA avançada com aprendizado contínuo",
      "Integração com CRM e sistemas externos",
      "Analytics detalhados e insights",
      "Múltiplos atendentes virtuais",
      "Suporte prioritário e consultoria"
    ],
    popular: true
  }
];

export const benefits = {
  sites: [
    "Posicionam a empresa com autoridade no mercado",
    "Transformam leads em compradores qualificados",
    "Melhoram significativamente a reputação digital",
    "Disponibilidade 24/7 para seus clientes",
    "Aumento comprovado nas conversões de vendas"
  ],
  ai: [
    "Atendimento instantâneo 24/7 (evita que clientes procurem a concorrência)",
    "Reduz drasticamente os custos com atendentes (de 7–10 atendentes para apenas 1–2)",
    "Aumenta conversão e satisfação do cliente",
    "Automatiza processos repetitivos",
    "Escala o atendimento sem aumentar custos proporcionalmente"
  ]
};

export const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    company: "TechSolutions Ltd",
    text: "A RW transformou completamente nossa presença digital. Em 3 meses, aumentamos nossas vendas online em 150%.",
    rating: 5
  },
  {
    id: 2,
    name: "Maria Santos",
    company: "Fashion Boutique",
    text: "A IA de WhatsApp deles revolucionou nosso atendimento. Reduzimos 80% dos custos com suporte e melhoramos a satisfação do cliente.",
    rating: 5
  },
  {
    id: 3,
    name: "João Pereira",
    company: "AutoPeças Express",
    text: "Site profissional, entrega no prazo e suporte excepcional. Recomendo a RW para qualquer empresa que quer crescer digitalmente.",
    rating: 5
  }
];

export const statistics = [
  {
    number: "80%",
    label: "Economia em atendimento",
    description: "Redução média nos custos operacionais"
  },
  {
    number: "150%",
    label: "Aumento em conversões",
    description: "Melhoria nas taxas de vendas"
  },
  {
    number: "24/7",
    label: "Disponibilidade",
    description: "Atendimento contínuo automatizado"
  },
  {
    number: "98%",
    label: "Satisfação do cliente",
    description: "Taxa de aprovação dos nossos serviços"
  }
];

export const whyChooseUs = [
  {
    icon: "Zap",
    title: "Tecnologia de Ponta",
    description: "Utilizamos as mais avançadas soluções em IA e desenvolvimento web para garantir resultados superiores."
  },
  {
    icon: "Target",
    title: "Foco em Resultados",
    description: "Cada projeto é desenvolvido com métricas claras e objetivos definidos para maximizar seu ROI."
  },
  {
    icon: "Shield",
    title: "Suporte Especializado",
    description: "Equipe técnica disponível para garantir que sua solução funcione perfeitamente sempre."
  },
  {
    icon: "TrendingUp",
    title: "Crescimento Escalável",
    description: "Soluções que crescem junto com seu negócio, sem limitações técnicas ou operacionais."
  }
];

export const mockFormSubmission = async (formData) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted with data:', formData);
      resolve({
        success: true,
        message: 'Formulário enviado com sucesso! Entraremos em contato em breve.'
      });
    }, 1500);
  });
};