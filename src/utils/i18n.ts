export type Lang = 'en' | 'pt'

export interface Translations {
  nav: {
    verify: string
    howItWorks: string
    about: string
    contact: string
  }
  hero: {
    badge: string
    title: string
    titleAccent: string
    subtitle: string
    cta: string
    stats: {
      verified: string
      verifiedLabel: string
      accuracy: string
      accuracyLabel: string
      support: string
      supportLabel: string
    }
  }
  form: {
    title: string
    subtitle: string
    ticketType: string
    ticketTypePlaceholder: string
    ticketNumber: string
    ticketNumberPlaceholder: string
    ticketCode: string
    ticketCodePlaceholder: string
    submit: string
    submitting: string
    required: string
    ticketTypes: {
  transcash: 'Transcash',
  neosurf: 'Neosurf',
  vapeur: 'Vapeur',
  paysafecard: 'Paysafecard',
  applecard: 'Apple Card',
  googleplay: 'Google Play',
  pcs: 'Mastercard PCS'
}
  }
  verification: {
    loadingMessages: string[]
    success: {
      title: string
      subtitle: string
      type: string
      number: string
      code: string
      timestamp: string
      verifyAnother: string
    }
  }
  howItWorks: {
    title: string
    subtitle: string
    steps: Array<{ title: string; desc: string }>
  }
  footer: {
    tagline: string
    rights: string
    privacy: string
    terms: string
  }
  ticker: string[]
}

const en: Translations = {
  nav: {
    verify: 'Verify',
    howItWorks: 'How It Works',
    about: 'About',
    contact: 'Contact',
  },
  hero: {
    badge: 'Trusted Ticket Verification',
    title: 'Is your ticket',
    titleAccent: 'authentic?',
    subtitle: 'Verify any ticket in seconds. Our system cross-checks your ticket details against the official database to confirm its authenticity — no guesswork, no fraud.',
    cta: 'Verify a Ticket',
    stats: {
      verified: '2.4M+',
      verifiedLabel: 'Tickets Verified',
      accuracy: '99.9%',
      accuracyLabel: 'Accuracy Rate',
      support: '24/7',
      supportLabel: 'Live Support',
    },
  },
  form: {
    title: 'Ticket Verification',
    subtitle: 'Enter your ticket details below for instant verification.',
    ticketType: 'Ticket Type',
    ticketTypePlaceholder: 'Select ticket type...',
    ticketNumber: 'Ticket Number',
    ticketNumberPlaceholder: 'e.g. TK-20240815-001234',
    ticketCode: 'Security Code',
    ticketCodePlaceholder: 'e.g. A1B2C3D4',
    submit: 'Verify Ticket',
    submitting: 'Verifying...',
    required: 'This field is required',
    ticketTypes: {
  transcash: 'Transcash',
  neosurf: 'Neosurf',
  vapeur: 'Vapeur',
  paysafecard: 'Paysafecard',
  applecard: 'Apple Card',
  googleplay: 'Google Play',
  pcs: 'Mastercard PCS'
},
  },
  verification: {
    loadingMessages: [
      'Connecting to database...',
      'Cross-checking ticket number...',
      'Validating security code...',
      'Confirming ticket details...',
      'Finalizing verification...',
    ],
    success: {
      title: 'Ticket Verified!',
      subtitle: 'This ticket is authentic and has been successfully verified in our system.',
      type: 'Ticket Type',
      number: 'Ticket Number',
      code: 'Security Code',
      timestamp: 'Verified at',
      verifyAnother: 'Verify Another Ticket',
    },
  },
  howItWorks: {
    title: 'How It Works',
    subtitle: 'Three simple steps to verify any ticket instantly.',
    steps: [
      {
        title: 'Enter Details',
        desc: 'Fill in your ticket type, number, and security code exactly as shown on your ticket.',
      },
      {
        title: 'Instant Check',
        desc: 'Our system queries the official database and verifies every detail of your ticket.',
      },
      {
        title: 'Get Result',
        desc: 'Receive an immediate confirmation of authenticity, or a fraud alert if something is wrong.',
      },
    ],
  },
  footer: {
    tagline: 'The trusted standard for ticket verification.',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  ticker: [
    '✓ Verified: Concert – THE WEEKND TOUR',
    '✓ Verified: Champions League Final',
    '✓ Verified: Rock in Rio Festival',
    '✓ Verified: Formula 1 Grand Prix',
    '✓ Verified: Broadway – Hamilton',
    '✓ Verified: NBA Finals – Game 7',
  ],
}

const pt: Translations = {
  nav: {
    verify: 'Verificar',
    howItWorks: 'Como Funciona',
    about: 'Sobre',
    contact: 'Contato',
  },
  hero: {
    badge: 'Verificação de Bilhetes Confiável',
    title: 'O seu bilhete é',
    titleAccent: 'autêntico?',
    subtitle: 'Verifique qualquer bilhete em segundos. O nosso sistema cruza os detalhes do bilhete com a base de dados oficial para confirmar a sua autenticidade — sem dúvidas, sem fraude.',
    cta: 'Verificar Bilhete',
    stats: {
      verified: '2,4M+',
      verifiedLabel: 'Bilhetes Verificados',
      accuracy: '99,9%',
      accuracyLabel: 'Taxa de Precisão',
      support: '24/7',
      supportLabel: 'Suporte ao Vivo',
    },
  },
  form: {
    title: 'Verificação de Bilhete',
    subtitle: 'Insira os dados do seu bilhete abaixo para verificação instantânea.',
    ticketType: 'Tipo de Bilhete',
    ticketTypePlaceholder: 'Selecione o tipo...',
    ticketNumber: 'Número do Bilhete',
    ticketNumberPlaceholder: 'ex. TK-20240815-001234',
    ticketCode: 'Código de Segurança',
    ticketCodePlaceholder: 'ex. A1B2C3D4',
    submit: 'Verificar Bilhete',
    submitting: 'A verificar...',
    required: 'Este campo é obrigatório',
    ticketTypes: {
  transcash: 'Transcash',
  neosurf: 'Neosurf',
  vapeur: 'Vapeur',
  paysafecard: 'Paysafecard',
  applecard: 'Apple Card',
  googleplay: 'Google Play',
  pcs: 'Mastercard PCS'
},
  },
  verification: {
    loadingMessages: [
      'A conectar à base de dados...',
      'A verificar número do bilhete...',
      'A validar código de segurança...',
      'A confirmar detalhes...',
      'A finalizar verificação...',
    ],
    success: {
      title: 'Bilhete Verificado!',
      subtitle: 'Este bilhete é autêntico e foi verificado com sucesso no nosso sistema.',
      type: 'Tipo de Bilhete',
      number: 'Número do Bilhete',
      code: 'Código de Segurança',
      timestamp: 'Verificado em',
      verifyAnother: 'Verificar Outro Bilhete',
    },
  },
  howItWorks: {
    title: 'Como Funciona',
    subtitle: 'Três passos simples para verificar qualquer bilhete instantaneamente.',
    steps: [
      {
        title: 'Insira os Dados',
        desc: 'Preencha o tipo de bilhete, número e código de segurança exatamente como aparecem no bilhete.',
      },
      {
        title: 'Verificação Instantânea',
        desc: 'O nosso sistema consulta a base de dados oficial e verifica cada detalhe do seu bilhete.',
      },
      {
        title: 'Veja o Resultado',
        desc: 'Receba confirmação imediata de autenticidade, ou alerta de fraude se algo estiver errado.',
      },
    ],
  },
  footer: {
    tagline: 'O padrão confiável para verificação de bilhetes.',
    rights: 'Todos os direitos reservados.',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
  },
  ticker: [
    '✓ Verificado: Concerto – TOUR THE WEEKND',
    '✓ Verificado: Final da Champions League',
    '✓ Verificado: Festival Rock in Rio',
    '✓ Verificado: Grande Prémio de Fórmula 1',
    '✓ Verificado: Teatro – Hamilton',
    '✓ Verificado: Finais NBA – Jogo 7',
  ],
}

export const translations: Record<Lang, Translations> = { en, pt }