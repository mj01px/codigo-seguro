import type { SimulatorStep, SimulatorOutcome, SimulatorOutcomeType } from '../types';

export const SIMULATOR_CONTACT = 'Loja Bom Preço';

export const SIMULATOR_STEPS: Record<1 | 2 | 3, SimulatorStep> = {
  1: {
    stepNumber: 1,
    scammerMessage:
      'Oi! Aqui é da Loja Bom Preço. Você ganhou um brinde na nossa promoção! Só falta confirmar o seu cadastro.',
    options: [
      {
        id: '1-a',
        label: 'Que legal! Como eu confirmo?',
        next: 2,
      },
      {
        id: '1-b',
        label: 'Eu não pedi brinde nenhum.',
        next: 2,
      },
    ],
  },
  2: {
    stepNumber: 2,
    scammerMessage:
      'Mandei um código por SMS para confirmar o cadastro. Pode me falar o código que chegou aí?',
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
    scammerMessage: 'Rapidinho, por favor, o código vence em 2 minutos!',
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
      text: 'Obrigado! Seu brinde já foi liberado.',
    },
    stamp: 'CAIU!',
    title: 'O golpista entrou no seu WhatsApp.',
    description:
      'Com esse código, ele coloca o seu WhatsApp no celular dele e começa a pedir dinheiro para a sua família, fingindo ser você.',
    notes: [
      { label: 'Calma:', text: 'dá para recuperar. O passo a passo está logo abaixo.' },
      { label: 'Lembre:', text: 'o próprio SMS diz “Não compartilhe este código”.' },
    ],
    ctaLabel: 'Ver o que fazer agora',
    ctaHref: '#agora',
    retryLabel: 'Tentar de novo',
  },
  won: {
    type: 'won',
    closingMessage: {
      author: 'system',
      text: 'Você bloqueou este número.',
    },
    stamp: 'BOA!',
    title: 'Nada acontece: o código expira sozinho.',
    description: 'Loja, banco ou empresa nenhuma precisa do código do seu WhatsApp. Quem pede é golpista.',
    notes: [
      { label: 'Sinais que você percebeu:', text: 'pedido do código, pressa, você não pediu nada.' },
      { label: 'Lembre:', text: 'o próprio SMS diz “Não compartilhe este código”.' },
    ],
    ctaLabel: 'Trancar meu WhatsApp',
    ctaHref: '#conta',
    retryLabel: 'Tentar de novo',
  },
};
