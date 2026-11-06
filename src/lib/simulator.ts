import type { SimulatorStep, SimulatorOutcome, SimulatorOutcomeType } from '../types';

export const SIMULATOR_STEPS: Record<1 | 2 | 3, SimulatorStep> = {
  1: {
    stepNumber: 1,
    scammerMessage:
      'Olá! Aqui é da Loja Casa Bela. Seu número foi sorteado e você ganhou um vale-compras de R$ 500!',
    options: [
      {
        id: '1-a',
        label: 'Que legal! O que eu preciso fazer?',
        next: 2,
      },
      {
        id: '1-b',
        label: 'Eu não participei de nenhum sorteio.',
        next: 2,
        tip: 'Boa desconfiança! Prêmio que você não pediu é um sinal de alerta.',
      },
    ],
  },
  2: {
    stepNumber: 2,
    scammerMessage:
      'Para liberar o prêmio, mandamos um código de 6 números por SMS. Me fala qual chegou?',
    showSmsNotification: true,
    smsText: 'Seu código do WhatsApp: 482-719. Não compartilhe este código.',
    options: [
      {
        id: '2-a',
        label: 'O código é 482-719.',
        next: 'lost',
      },
      {
        id: '2-b',
        label: 'Não vou passar. Esse código é só meu.',
        next: 3,
      },
      {
        id: '2-c',
        label: 'Vou ligar para a loja para confirmar.',
        next: 3,
      },
    ],
  },
  3: {
    stepNumber: 3,
    scammerMessage: 'Rápido! O código vence em 2 minutos e você perde o prêmio!',
    options: [
      {
        id: '3-a',
        label: 'Tá bom, é 482-719.',
        next: 'lost',
      },
      {
        id: '3-b',
        label: 'Vou bloquear este número.',
        next: 'won',
      },
    ],
  },
};

export const SIMULATOR_OUTCOMES: Record<SimulatorOutcomeType, SimulatorOutcome> = {
  lost: {
    type: 'lost',
    closingMessage: {
      author: 'scammer',
      text: 'Obrigado! Seu prêmio já foi liberado.',
    },
    title: 'O golpista entrou no seu WhatsApp.',
    description:
      'Com esse código, ele instala o seu WhatsApp no celular dele. Você fica sem acesso e ele começa a pedir Pix para a sua família, fingindo ser você. Mas calma: dá para recuperar.',
    ctaLabel: 'Ver o que fazer agora',
    ctaHref: '#ja-roubaram',
    retryLabel: 'Tentar de novo',
  },
  won: {
    type: 'won',
    closingMessage: {
      author: 'system',
      text: 'Você bloqueou este número.',
    },
    title: 'Muito bem! Você protegeu o seu WhatsApp.',
    description:
      'Nenhuma loja, banco ou empresa precisa do código do seu WhatsApp. Quem pede é golpista. Agora, deixe a sua conta ainda mais segura.',
    ctaLabel: 'Trancar meu WhatsApp',
    ctaHref: '#proteger',
    retryLabel: 'Tentar de novo',
  },
};
