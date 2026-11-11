// @ts-nocheck
/*
 * Página inteira do Código Seguro, convertida do artifact de design
 * (https://claude.ai/artifact/KEfTh7Y8WRFQM55hSoG4ua). A marcação e os estilos
 * seguem o artifact; a lógica é a mesma do script dele, agora num componente React.
 */
import { Component, Fragment } from 'react';
import { Cadu } from './components/Cadu';
import { css } from './lib/css';

/** Para publicar o vídeo: available = true (o id do YouTube já está aqui). */
const VIDEO = { available: true, youtubeId: 'BxC_jVvHrF0' };

const SIM = {
  1: { msg: 'Oi! Aqui é da transportadora Entregas Bom Caminho. Tem uma encomenda no seu nome para entregar hoje.', options: [
    { id: '1-a', label: 'Ah, que bom! O que eu preciso fazer?', next: 2 },
    { id: '1-b', label: 'Não estou esperando nenhuma encomenda.', next: 2 }
  ] },
  2: { msg: 'Para liberar a sua encomenda, mandei um código por SMS. Me confirma o código que chegou aí?', options: [
    { id: '2-a', label: 'O código é 482-719.', next: 'lost' },
    { id: '2-b', label: 'Não vou passar. Esse código é só meu.', next: 3 },
    { id: '2-c', label: 'Vou conferir com a loja onde comprei.', next: 3 }
  ] },
  3: { msg: 'Rapidinho, por favor, senão a encomenda volta. O código vence em 2 minutos!', options: [
    { id: '3-a', label: 'Tá bom, é 482-719.', next: 'lost' },
    { id: '3-b', label: 'Vou bloquear este número.', next: 'won' }
  ] }
};
const RES = {
  lost: { closing: { author: 'scammer', text: 'Obrigado! Sua encomenda já foi liberada.' }, stamp: 'CAIU!', title: 'O golpista entrou no seu WhatsApp.', description: 'Com esse código, ele coloca o seu WhatsApp no celular dele e começa a pedir dinheiro para a sua família, fingindo ser você.', notes: [ { label: 'Calma:', text: 'dá para recuperar. O passo a passo está logo abaixo.' }, { label: 'Lembre:', text: 'o próprio SMS diz “Não compartilhe este código”.' } ], ctaLabel: 'Ver o que fazer agora', ctaHref: '#agora' },
  won: { closing: { author: 'system', text: 'Você bloqueou este número.' }, stamp: 'BOA!', title: 'Nada acontece: o código expira sozinho.', description: 'Entrega não precisa de código do WhatsApp. Quem pede é golpista.', notes: [ { label: 'Sinais que você percebeu:', text: 'pedido do código, pressa, você não pediu nada.' }, { label: 'Lembre:', text: 'o próprio SMS diz “Não compartilhe este código”.' } ], ctaLabel: 'Trancar meu WhatsApp', ctaHref: '#conta' }
};
const SIGNS = [
  { title: 'Pedem um código', text: 'que chegou por SMS. Já basta.' },
  { title: 'Você não pediu nada.', text: 'O código chegou do nada.' },
  { title: 'Pressa.', text: '“Vence em 2 minutos.”' },
  { title: 'Dizem ser de uma empresa,', text: 'mas o número é desconhecido.' },
  { title: 'O SMS fala de WhatsApp,', text: 'mas a conversa era sobre outra coisa.' }
];
const DISGUISES = [
  { title: 'Loja ou promoção', quote: '“Você ganhou um brinde! Só preciso do código que chegou aí.”', action: 'desligue. Loja nenhuma precisa do código.' },
  { title: 'Entrega ou pesquisa', quote: '“É da transportadora. Para liberar sua encomenda, me confirma o código.”', action: 'entrega não precisa de código do WhatsApp.' },
  { title: 'Anúncio de venda', quote: '“Vi seu anúncio do sofá. O site pede que você me passe o código.”', action: 'converse só pelo chat do site de anúncios.' },
  { title: 'Falso suporte do WhatsApp', quote: '“Sua conta vai ser bloqueada. Envie o código para mantê-la ativa.”', action: 'o WhatsApp nunca pede o código.' },
  { title: 'Amigo “por engano”', quote: '“Mandei um código pro seu número sem querer, me passa?”', action: 'ligue para a pessoa. A conta dela já foi roubada.' },
  { title: 'Vacina ou benefício', quote: '“É da Secretaria de Saúde. Confirme o código da sua vacina.”', action: 'saúde e governo não pedem código.' }
];
const CHAPTERS = [
  { start: 21, title: 'A “loja” pede um código', text: 'O Pablo quase passa o código do WhatsApp.' },
  { start: 83, title: 'Por que nunca passar o código', text: 'O que o golpista faz com ele.' },
  { start: 244, title: 'Ativando a verificação em duas etapas', text: 'Passo a passo, na tela do celular.' },
  { start: 373, title: 'Passe para a família', text: 'Quem mais precisa saber disso.' }
];
const NAV = [
  { id: 'entenda', label: '1 · Entenda' },
  { id: 'previna', label: '2 · Previna' },
  { id: 'treine', label: '3 · Simulador' },
  { id: 'conta', label: '4 · Proteja-se' },
  { id: 'video', label: '5 · Vídeo' },
  { id: 'agora', label: 'Passei o código', urgent: true }
];
const SHARE_TEXT = 'Gente, nunca passem o código que chega por SMS para ninguém. Quem pede é golpista. Vejam o guia: codigoseguro.pages.dev';
const LARGE_KEY = 'codigo-seguro:large-text';

function seg(t, b) { return { t: t, b: !!b, n: !b }; }
function listScreen(title, rows, active, back, profile) {
  return { isList: true, title: title, back: !!back, profile: !!profile, rows: rows.map(function (r) {
    var on = r === active;
    return { label: r, style: 'display: flex; justify-content: space-between; align-items: center; padding: 9px 8px; border-radius: 8px; font-size: 10.5px;' + (on ? ' font-weight: 700; background: #FFF4CC; outline: 1.5px solid #1C2541;' : ' color: #2E3550;') };
  }) };
}
function settingsStep(title) {
  return Object.assign(listScreen(title, ['Conta', 'Privacidade', 'Conversas', 'Notificações'], 'Conta', false, true), { caption: [seg('Toque em '), seg('Conta', 1), seg('.')] });
}
const COMMON = [
  Object.assign(listScreen('Conta', ['Verificação em duas etapas', 'Alterar número', 'Solicitar dados', 'Apagar conta'], 'Verificação em duas etapas', true, false), { caption: [seg('Verificação em duas etapas', 1), seg(' e depois '), seg('Ativar', 1), seg('.')] }),
  { isForm: true, caption: [seg('Crie a sua '), seg('senha', 1), seg('. Pronto, conta trancada.')] }
];
const HOWTO = {
  android: [ { isMenu: true, caption: [seg('Toque nos '), seg('três pontinhos', 1), seg(' e em '), seg('Configurações', 1), seg('.')] }, settingsStep('Configurações') ].concat(COMMON),
  iphone: [ { isTabs: true, caption: [seg('Toque em '), seg('Você', 1), seg(', embaixo à direita (ou em '), seg('Configurações', 1), seg(').')] }, settingsStep('Você') ].concat(COMMON)
};

function fmt(s) { var m = Math.floor(s / 60); var r = String(s % 60).padStart(2, '0'); return m + ':' + r; }

export class Page extends Component {

  constructor(props) {
    super(props);
    var large = false;
    try { large = window.localStorage.getItem(LARGE_KEY) === 'true'; } catch (e) { large = false; }
    this.state = { step: 1, msgs: [{ id: 'step-1', author: 'scammer', text: SIM[1].msg }], result: null, typing: false, platform: 'android', q1: true, q2: false, flipped: false, copied: false, chapter: 0, playing: false, large: large, speaking: false, speechSupported: false, active: null };
  }
  componentDidMount() {
    var ok = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
    this.setState({ speechSupported: ok });
    if (typeof IntersectionObserver !== 'undefined') {
      var self = this;
      this.io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) self.setState({ active: en.target.id }); });
      }, { rootMargin: '-40% 0px -55% 0px' });
      NAV.forEach(function (n) { var el = document.getElementById(n.id); if (el) self.io.observe(el); });
    }
  }
  componentDidUpdate() {
    if (this.chatEl) this.chatEl.scrollTop = this.chatEl.scrollHeight;
  }
  componentWillUnmount() {
    clearTimeout(this.timer); clearTimeout(this.copyTimer);
    if (this.io) this.io.disconnect();
    if (this.state.speechSupported) window.speechSynthesis.cancel();
  }
  choose(opt) {
    if (this.state.typing || this.state.result) return;
    var self = this;
    this.setState(function (s) { return { typing: true, msgs: s.msgs.concat([{ id: 'reply-' + opt.id, author: 'user', text: opt.label }]) }; });
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      var n = opt.next;
      if (n === 'lost' || n === 'won') {
        var r = RES[n];
        self.setState(function (s) { return { typing: false, result: n, msgs: s.msgs.concat([{ id: 'closing-' + n, author: r.closing.author, text: r.closing.text }]) }; });
      } else {
        self.setState(function (s) { return { typing: false, step: n, msgs: s.msgs.concat([{ id: 'step-' + n, author: 'scammer', text: SIM[n].msg }]) }; });
      }
    }, reduce ? 150 : 1100);
  }
  reset() {
    clearTimeout(this.timer);
    this.setState({ step: 1, result: null, typing: false, msgs: [{ id: 'step-1', author: 'scammer', text: SIM[1].msg }] });
  }
  copyFallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { return document.execCommand('copy'); } catch (e) { return false; } finally { document.body.removeChild(ta); }
  }
  async share() {
    if (typeof navigator.share === 'function') {
      try { await navigator.share({ title: 'Código Seguro', text: SHARE_TEXT }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; }
    }
    var ok;
    try { await navigator.clipboard.writeText(SHARE_TEXT); ok = true; } catch (e) { ok = this.copyFallback(SHARE_TEXT); }
    if (ok) {
      var self = this;
      this.setState({ copied: true });
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(function () { self.setState({ copied: false }); }, 3000);
    }
  }
  async copyMsg() {
    var ok;
    try { await navigator.clipboard.writeText(SHARE_TEXT); ok = true; } catch (e) { ok = this.copyFallback(SHARE_TEXT); }
    if (ok) {
      var self = this;
      this.setState({ copied: true });
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(function () { self.setState({ copied: false }); }, 3000);
    }
  }
  toggleLarge() {
    var next = !this.state.large;
    try { window.localStorage.setItem(LARGE_KEY, String(next)); } catch (e) { next = next; }
    this.setState({ large: next });
  }
  toggleSpeak() {
    if (!this.state.speechSupported) return;
    var ss = window.speechSynthesis;
    if (ss.speaking || this.state.speaking) { ss.cancel(); this.setState({ speaking: false }); return; }
    var secs = Array.prototype.slice.call(document.querySelectorAll('main section[data-readable]'));
    if (!secs.length) return;
    var mid = window.innerHeight / 2, best = secs[0], dist = Infinity;
    secs.forEach(function (el) { var b = el.getBoundingClientRect(); var d = Math.abs(b.top + b.height / 2 - mid); if (d < dist) { dist = d; best = el; } });
    var text = best.innerText.replace(/\s+/g, ' ').trim();
    if (!text) return;
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR'; u.rate = 0.95;
    var voices = ss.getVoices();
    var v = voices.find(function (x) { return x.lang.toLowerCase().indexOf('pt-br') === 0; }) || voices.find(function (x) { return x.lang.toLowerCase().indexOf('pt') === 0; });
    if (v) u.voice = v;
    var self = this;
    u.onend = function () { self.setState({ speaking: false }); };
    u.onerror = function () { self.setState({ speaking: false }); };
    this.setState({ speaking: true });
    ss.speak(u);
  }
  renderVals() {
    var self = this, s = this.state;
    var available = VIDEO.available;
    var step = SIM[s.step];
    var r = s.result ? RES[s.result] : null;
    var lost = s.result === 'lost';
    var segStyle = function (i) { var on = !!s.result || s.step >= i; return 'height: 6px; border-radius: 999px; background: ' + (on ? (lost ? '#A61E3A' : '#0E6B4B') : '#EADFB8') + '; transition: background-color .3s ease'; };
    var stepDots = [1, 2, 3].map(function (i) {
      var reached = i <= s.step;
      var bg = '#FFFFFF', fg = '#8A90A6', bd = '#C9C2B0';
      if (s.result && reached) { bg = lost ? '#F0566B' : '#3DBE7E'; fg = '#1C2541'; bd = '#1C2541'; }
      else if (!s.result && i < s.step) { bg = '#3DBE7E'; fg = '#1C2541'; bd = '#1C2541'; }
      else if (!s.result && i === s.step) { bg = '#FFD447'; fg = '#1C2541'; bd = '#1C2541'; }
      return { n: String(i),
        lineStyle: i === 1 ? 'display: none' : 'flex: 1; height: 3px; margin: 0 6px; border-radius: 999px; background: ' + (reached ? '#1C2541' : '#D9D2C0') + '; transition: background-color .3s ease',
        style: "width: 38px; height: 38px; flex-shrink: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Lexend', sans-serif; font-weight: 800; font-size: 16px; border: 3px solid " + bd + '; background: ' + bg + '; color: ' + fg + '; transition: background-color .3s ease, border-color .3s ease' };
    });
    var res = r ? {
      stamp: r.stamp, title: r.title, description: r.description, notes: r.notes, ctaLabel: r.ctaLabel, ctaHref: r.ctaHref,
      stampStyle: 'flex-shrink: 0; transform: rotate(-6deg); padding: 4px 14px; border-radius: 10px; background: #FFFFFF; border: 3px solid ' + (lost ? '#A61E3A' : '#0E6B4B') + '; color: ' + (lost ? '#A61E3A' : '#0E6B4B') + '; box-shadow: 3px 3px 0 ' + (lost ? '#A61E3A' : '#0E6B4B') + "; font-family: 'Permanent Marker', cursive; font-size: 28px",
      bannerStyle: 'display: flex; align-items: center; gap: 16px; padding: 16px 18px; border-radius: 22px; border: 3px solid #1C2541; background: ' + (lost ? '#F0566B' : '#3DBE7E'),
      notesStyle: 'display: flex; flex-direction: column; gap: 6px; padding: 14px 16px; border-radius: 16px; background: ' + (lost ? '#FCE8EC' : '#D3F1E3')
    } : { stamp: '', title: '', description: '', notes: [], ctaLabel: '', ctaHref: '#', stampStyle: '', notesStyle: '', bannerStyle: '' };
    var navLink = 'display: inline-flex; align-items: center; min-height: 44px; padding: 0 13px; border-radius: 999px; font-size: 14px; font-weight: 700; text-decoration: none; white-space: nowrap; ';
    var nav = NAV.map(function (n) {
      var on = s.active === n.id;
      var bg = n.urgent ? '#A61E3A' : '#1C2541';
      return { href: '#' + n.id, label: n.label, current: on ? 'location' : 'false',
        style: navLink + (on ? 'background: ' + bg + '; color: #FBF8F1;' : 'color: ' + (n.urgent ? '#A61E3A' : '#1C2541') + ';') };
    });
    var chapters = CHAPTERS.map(function (c, i) {
      var on = s.playing && s.chapter === i;
      return { time: fmt(c.start), title: c.title, text: c.text,
        pick: function () { if (available) self.setState({ chapter: i, playing: true }); },
        style: 'width: 100%; display: flex; gap: 14px; align-items: flex-start; text-align: left; padding: 14px 16px; border-radius: 16px; color: #FFFFFF; border: 1px solid ' + (on ? '#FFD447' : 'rgba(255,255,255,.14)') + '; background: ' + (on ? 'rgba(255,212,71,.1)' : 'transparent') + ';' + (available ? '' : ' opacity: .6;') };
    });
    var platforms = [{ id: 'android', label: 'Android' }, { id: 'iphone', label: 'iPhone' }].map(function (p) {
      var on = s.platform === p.id;
      return { label: p.label, pressed: on ? 'true' : 'false', pick: function () { self.setState({ platform: p.id }); },
        style: 'min-height: 44px; padding: 0 24px; border: 0; border-radius: 999px; font-weight: 800; font-size: 15px; transition: background-color .15s ease; ' + (on ? 'background: #1C2541; color: #FFD447;' : 'background: transparent; color: #1C2541;') };
    });
    var howto = HOWTO[s.platform].map(function (st, i) { return Object.assign({ isMenu: false, isTabs: false, isList: false, isForm: false, title: '', back: false, profile: false, rows: [] }, st, { num: i + 1, tilt: ['-2deg', '1.5deg', '-1.5deg', '2deg'][i] || '0deg',
      numStyle: "width: 36px; height: 36px; flex-shrink: 0; border-radius: 50%; border: 3px solid #1C2541; display: flex; align-items: center; justify-content: center; font-family: 'Lexend', sans-serif; font-weight: 800; font-size: 16px; color: #1C2541; background: " + ['#FFD447', '#3DBE7E', '#F0566B', '#9EDFC3'][i] }); });
    var pill = 'display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-width: 48px; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 0; font-weight: 700; font-size: 15px; ';
    return {
      nav: nav,
      zoom: s.large ? '1.15' : '1',
      keyDigits: ['4', '8', '2', '7', '1', '9'],
      signs: SIGNS.map(function (x, i) { return { num: '0' + (i + 1), title: x.title, text: x.text }; }),
      disguises: DISGUISES.map(function (d, i) {
        var f = i === 0;
        return { num: '0' + (i + 1), title: d.title, quote: d.quote, action: d.action,
          cardStyle: 'display: flex; flex-direction: column; gap: 14px; padding: 28px; border-radius: 24px; border: 3px solid #1C2541; box-shadow: ' + (f ? '8px 8px 0 #FFD447' : '6px 6px 0 #1C2541') + '; background: ' + (f ? '#1C2541' : '#FFFFFF') + '; color: ' + (f ? '#FFFFFF' : '#1C2541'),
          eyebrowStyle: "font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700; letter-spacing: .08em; color: " + (f ? '#FFD447' : '#0E6B4B'),
          quoteStyle: 'padding: 14px 16px; border-radius: 16px 16px 16px 4px; font-size: 16px; line-height: 1.5; background: ' + (f ? 'rgba(255,255,255,.08)' : '#F4F1EA') + '; color: ' + (f ? '#E3E7F2' : '#2E3550'),
          checkStyle: 'width: 22px; height: 22px; flex-shrink: 0; margin-top: 2px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ' + (f ? '#FFD447' : '#0E6B4B') + '; color: ' + (f ? '#1C2541' : '#FFFFFF') };
      }),
      chatRef: function (el) { self.chatEl = el; },
      chatStyle: 'flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding: ' + ((!s.result && s.step >= 2) ? '128px' : '16px') + ' 12px 22px; transition: padding-top .3s ease',
      showSms: !s.result && s.step >= 2,
      msgs: s.msgs.map(function (m) { return { text: m.text, isScammer: m.author === 'scammer', isUser: m.author === 'user', isSystem: m.author === 'system' }; }),
      typing: s.typing,
      question: s.result ? 'Fim da conversa.' : (s.typing ? 'Esperando a resposta...' : 'O que você faria?'),
      progress: s.result ? 'Simulação concluída' : 'Passo ' + s.step + ' de 3',
      seg1: segStyle(1), seg2: segStyle(2), seg3: segStyle(3),
      stepDots: stepDots,
      noResult: !s.result, hasResult: !!s.result,
      isLost: s.result === 'lost', isWon: s.result === 'won',
      options: step.options.map(function (o, i) { return { letter: ['A', 'B', 'C'][i], label: o.label, pick: function () { self.choose(o); },
        letterStyle: "width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; border: 3px solid #1C2541; display: flex; align-items: center; justify-content: center; font-family: 'Lexend', sans-serif; font-weight: 800; font-size: 17px; color: #1C2541; background: " + ['#FFD447', '#3DBE7E', '#F0566B'][i] }; }),
      res: res,
      reset: function () { self.reset(); },
      videoAvailable: available,
      videoLocked: !available,
      videoPlaying: available && s.playing,
      videoIdle: !(available && s.playing),
      coverLabel: available ? 'Assistir ao vídeo' : 'Vídeo em breve',
      playVideo: function () { if (available) self.setState({ chapter: 0, playing: true }); },
      activeStart: String(CHAPTERS[s.chapter].start),
      activeTitle: fmt(CHAPTERS[s.chapter].start) + ' · ' + CHAPTERS[s.chapter].title,
      chapters: chapters,
      videoHint: available ? 'toque num capítulo para pular direto' : 'o vídeo volta em breve',
      platforms: platforms,
      howto: howto,
      ghost5: [1, 2, 3, 4, 5], ghost4: [1, 2, 3, 4],
      q1Open: s.q1, q2Open: s.q2, q1Rot: s.q1 ? '180deg' : '0deg', q2Rot: s.q2 ? '180deg' : '0deg',
      toggleQ1: function () { self.setState({ q1: !s.q1 }); },
      toggleQ2: function () { self.setState({ q2: !s.q2 }); },
      share: function () { self.share(); },
      copyMsg: function () { self.copyMsg(); },
      copyLabel: s.copied ? 'Mensagem copiada!' : 'Copiar mensagem',
      flipBtnLabel: s.flipped ? 'Ver a frente' : 'Virar para o verso',
      flippedAttr: s.flipped ? 'true' : 'false',
      shareLabel: s.copied ? 'Mensagem copiada!' : 'Compartilhar',
      shareStatus: s.copied ? 'Mensagem copiada.' : '',
      flip: function () { self.setState({ flipped: !s.flipped }); },
      flipDeg: s.flipped ? '180deg' : '0deg',
      flipLabel: s.flipped ? 'Ver a frente do panfleto' : 'Ver o verso do panfleto',
      frontAlt: s.flipped ? '' : 'Frente do panfleto Código Seguro',
      backAlt: s.flipped ? 'Verso do panfleto Código Seguro' : '',
      large: s.large ? 'true' : 'false',
      largeLabel: s.large ? 'Voltar a letra ao normal' : 'Aumentar a letra',
      largeStyle: pill + (s.large ? 'background: #1C2541; color: #FFD447;' : 'background: #F1ECDF; color: #1C2541;'),
      toggleLarge: function () { self.toggleLarge(); },
      speechSupported: s.speechSupported,
      speaking: s.speaking ? 'true' : 'false',
      speakLabel: s.speaking ? 'Parar' : 'Ouvir',
      speakStyle: pill + (s.speaking ? 'background: #A61E3A; color: #FFFFFF;' : 'background: #1C2541; color: #FFFFFF;'),
      toggleSpeak: function () { self.toggleSpeak(); }
    };
  }

  render() {
    const { stamp, title, description, notes, ctaLabel, ctaHref, stampStyle, bannerStyle, notesStyle, numStyle, nav, zoom, keyDigits, signs, disguises, chatRef, chatStyle, showSms, msgs, typing, question, progress, seg1, seg2, seg3, stepDots, noResult, hasResult, isLost, isWon, options, res, reset, videoAvailable, videoLocked, videoPlaying, videoIdle, coverLabel, playVideo, activeStart, activeTitle, chapters, videoHint, platforms, howto, ghost5, ghost4, q1Open, q2Open, q1Rot, q2Rot, toggleQ1, toggleQ2, share, copyMsg, copyLabel, flipBtnLabel, flippedAttr, shareLabel, shareStatus, flip, flipDeg, flipLabel, frontAlt, backAlt, large, largeLabel, largeStyle, toggleLarge, speechSupported, speaking, speakLabel, speakStyle, toggleSpeak } = this.renderVals();

    return (
      <div style={{ minHeight: "100vh", background: "#FBF8F1", color: "#1C2541", fontFamily: "'Lexend', system-ui, sans-serif", fontSize: "17px", lineHeight: "1.6", overflowX: "hidden" }}>
      <a href="#entenda" style={{ position: "absolute", left: "-9999px" }}>Pular para o conteúdo principal</a>

      <header style={{ position: "sticky", top: "0", zIndex: "40", background: "rgba(251,248,241,.94)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", borderBottom: "2px solid transparent" }}>
      <div style={{ maxWidth: "1240px", minHeight: "76px", margin: "0 auto", padding: "10px clamp(16px, 3vw, 24px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
      <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#1C2541", flexShrink: "0" }}>
      <Cadu mood="alerta" size={44} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: "1.1" }}>
      <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "22px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Código Seguro</span>
      <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#4A5270", whiteSpace: "nowrap" }}>Universidade de Mogi das Cruzes</span>
      </span>
      </a>
      <nav className="cs-nav-d" aria-label="Partes do guia" style={{ display: "flex", gap: "4px" }}>
      {(nav).map((n, i1) => (<Fragment key={i1}>
      <a href={n.href} className="cs-navlink" aria-current={n.current} style={css(n.style)}>{n.label}</a>
      </Fragment>))}
      </nav>
      <span className="cs-tag" style={{ flexShrink: "0", padding: "7px 14px", borderRadius: "999px", border: "2px solid #1C2541", background: "#FFF4CC", color: "#1C2541", fontSize: "13px", fontWeight: "800", whiteSpace: "nowrap" }}>Projeto de extensão</span>
      <a href="#agora" className="cs-nav-m cs-btn" style={{ flexShrink: "0", display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: "2px solid #1C2541", background: "#A61E3A", color: "#FFFFFF", fontSize: "13px", fontWeight: "800", textDecoration: "none", whiteSpace: "nowrap" }}>Passei o código</a>
      </div>
      </header>

      <div style={{ zoom: `${zoom}` }}>
      <main id="conteudo-principal">

      <section id="inicio" data-readable="true" aria-labelledby="hero-title" style={{ padding: "clamp(12px, 2vw, 24px) clamp(12px, 2vw, 24px) 0" }}>
      <div style={{ maxWidth: "1392px", margin: "0 auto", backgroundColor: "#0E6B4B", backgroundImage: "radial-gradient(rgba(255,255,255,.13) 1.6px, transparent 1.8px)", backgroundSize: "24px 24px", color: "#FFFFFF", borderRadius: "clamp(24px, 3vw, 36px)", overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(48px, 7vw, 96px) clamp(20px, 4vw, 40px) clamp(40px, 6vw, 80px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px clamp(56px, 8vw, 120px)" }}>
      <div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
      <span style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px 8px 12px", borderRadius: "10px", background: "#A61E3A", color: "#FFFFFF", fontSize: "14px", fontWeight: "800", letterSpacing: ".12em", textTransform: "uppercase" }}>
      <svg className="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4"></path><path d="M12 17h.01"></path><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"></path></svg>
      Alerta de golpe
      </span>
      <h1 id="hero-title" style={{ fontFamily: "'Permanent Marker', cursive", fontWeight: "400", lineHeight: "1", display: "flex", flexDirection: "column", gap: "4px", textTransform: "uppercase" }}>
      <span style={{ fontSize: "clamp(30px, 3.6vw, 50px)", color: "#FFFFFF" }}>Antes de</span>
      <span style={{ position: "relative", alignSelf: "flex-start", fontSize: "clamp(54px, 8.4vw, 124px)", lineHeight: "1", color: "#FFD447", paddingBottom: "14px" }}>responder,<svg aria-hidden="true" viewBox="0 0 420 22" preserveAspectRatio="none" style={{ position: "absolute", left: "0", right: "0", bottom: "-4px", width: "100%", height: "18px", overflow: "visible" }}><path d="M4 14 C100 4, 260 4, 416 12" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "9", strokeLinecap: "round" }}></path></svg></span>
      <span style={{ marginTop: "14px", fontSize: "clamp(30px, 3.6vw, 50px)", color: "#FFFFFF" }}>pare e confirme.</span>
      </h1>
      <p style={{ maxWidth: "32em", fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: "1.6", color: "#E6F1EB" }}>Golpistas ligam dizendo ser de uma loja e pedem o código que chegou por SMS. Com ele, <b style={{ color: "#FFFFFF" }}>roubam seu WhatsApp</b> e pedem dinheiro para a sua família.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
      <a href="#entenda" className="cs-btn" style={{ display: "inline-flex", alignItems: "center", gap: "10px", minHeight: "56px", padding: "0 28px", borderRadius: "999px", background: "#FFD447", color: "#1C2541", border: "3px solid #1C2541", boxShadow: "4px 4px 0 #1C2541", fontWeight: "800", fontSize: "17px", textDecoration: "none" }}>Começar o guia<svg className="ic" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ strokeWidth: "2.4" }}><path d="m13 6 6 6-6 6"></path></svg></a>

      </div>
      </div>

      <div aria-hidden="true" style={{ flex: "1 1 380px", minWidth: "0", display: "flex", justifyContent: "flex-end" }}>
      <div className="cs-hero-scene" style={{ position: "relative", width: "440px", maxWidth: "100%", height: "540px" }}>
      <span style={{ position: "absolute", left: "50%", top: "50%", width: "420px", height: "420px", margin: "-210px 0 0 -210px", borderRadius: "50%", background: "rgba(255,255,255,.12)" }}></span>
      <div style={{ position: "absolute", left: "50%", top: "22px", marginLeft: "-70px", transform: "rotate(5deg)" }}>
      <div style={{ position: "relative", width: "240px", height: "490px", borderRadius: "46px", background: "#1C2541", padding: "12px" }}>
      <span aria-hidden="true" style={{ position: "absolute", left: "-7px", top: "116px", width: "9px", height: "38px", borderRadius: "5px 0 0 5px", background: "#1C2541" }}></span>
      <span aria-hidden="true" style={{ position: "absolute", left: "-7px", top: "166px", width: "9px", height: "52px", borderRadius: "5px 0 0 5px", background: "#1C2541" }}></span>
      <span aria-hidden="true" style={{ position: "absolute", right: "-7px", top: "140px", width: "9px", height: "74px", borderRadius: "0 5px 5px 0", background: "#1C2541" }}></span>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "35px", overflow: "hidden", background: "#E3F4EC", color: "#1C2541", display: "flex", flexDirection: "column", alignItems: "center", padding: "46px 12px 0" }}>
      <span style={{ position: "absolute", top: "11px", left: "50%", marginLeft: "-40px", width: "80px", height: "24px", borderRadius: "999px", background: "#1C2541" }}></span>
      <svg className="ic" width="16" height="16" viewBox="0 0 24 24" style={{ strokeWidth: "2.6" }}><rect x="5" y="11" width="14" height="10" rx="2.5"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg>
      <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "700", fontSize: "58px", letterSpacing: "-0.04em", lineHeight: "1.1", marginTop: "4px" }}>15:40</p>
      <div style={{ marginTop: "28px", width: "100%", background: "#FFFFFF", borderRadius: "18px", padding: "12px", display: "flex", gap: "10px", border: "2.5px solid #1C2541", boxShadow: "4px 4px 0 #1C2541" }}>
      <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "#0E6B4B", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: "#FFFFFF" }}><path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1z"></path></svg></span>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px", fontSize: "11.5px", lineHeight: "1.35", minWidth: "0" }}>
      <span style={{ display: "flex", justifyContent: "space-between", color: "#5B6170", fontSize: "10.5px" }}><span>Mensagens</span><span>agora</span></span>
      <strong style={{ fontSize: "12.5px" }}>WhatsApp</strong>
      <span>Seu código do WhatsApp: <mark style={{ background: "#FFD447", color: "#1C2541", padding: "0 3px", borderRadius: "3px", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700" }}>482-719</mark>. Não compartilhe este código.</span>
      </div>
      </div>
      <div style={{ marginTop: "auto", marginBottom: "30px", width: "100%", display: "flex", justifyContent: "space-between", padding: "0 18px" }}>
      <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(28,37,65,.12)" }}></span>
      <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(28,37,65,.12)" }}></span>
      </div>
      <span style={{ position: "absolute", bottom: "9px", left: "50%", marginLeft: "-46px", width: "92px", height: "5px", borderRadius: "999px", background: "#1C2541" }}></span>
      </div>
      </div>
      </div>
      <div style={{ position: "absolute", top: "36px", left: "-8px", zIndex: "2", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div style={{ position: "relative", width: "220px", padding: "14px 18px", borderRadius: "24px", background: "#FFD447", color: "#1C2541", fontWeight: "700", fontSize: "16px", lineHeight: "1.4", border: "3px solid #1C2541" }}>Oi! É da loja. Me fala o código que chegou?<svg width="42" height="38" viewBox="0 -1.5 26 23.5" style={{ position: "absolute", left: "83px", top: "93px", overflow: "visible", width: "37px", height: "26px" }}><path d="M2 -1.5 L2 0 C6 8, 5 15, 1 21 C10 18, 18 10, 22 0 L22 -1.5 Z" style={{ fill: "#FFD447" }}></path><path d="M2 0 C6 8, 5 15, 1 21 C10 18, 18 10, 22 0" style={{ fill: "none", stroke: "#1C2541", strokeWidth: "1.9", strokeLinejoin: "round" }}></path></svg></div>
      <div style={{ margin: "27px 0 0 6px", width: "130px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "#FFFFFF", fontSize: "14px", fontWeight: "800", lineHeight: "1.2", textAlign: "center" }}>
      <span style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#1C2541", color: "#FFFFFF", border: "3px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="26" height="26" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path></svg></span>
      Número desconhecido
      </div>
      </div>

      <div style={{ position: "absolute", left: "-6px", bottom: "34px", zIndex: "2", transform: "rotate(-6deg)" }}><Cadu mood="alerta" size={124} /></div>
      </div>
      </div>
      </div>
      </div>
      </section>

      <div aria-hidden="true" style={{ position: "relative", zIndex: "2", margin: "clamp(-34px, -2vw, -18px) -24px 0", transform: "rotate(-1.2deg)", background: "#FFD447", overflow: "hidden", borderTop: "3px solid #1C2541", borderBottom: "3px solid #1C2541" }}>
      <div className="cs-marquee" style={{ display: "flex", width: "max-content", padding: "14px 0", fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "17px", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
      <span style={{ display: "flex", gap: "28px", paddingRight: "28px", alignItems: "center" }}>O CÓDIGO DO SMS É SÓ SEU <span style={{ color: "#A61E3A" }}>✕</span> PEDIU O CÓDIGO? É GOLPE <span style={{ color: "#A61E3A" }}>✕</span> ANTES DE RESPONDER, PARE E CONFIRME <span style={{ color: "#A61E3A" }}>✕</span> O CÓDIGO DO SMS É SÓ SEU <span style={{ color: "#A61E3A" }}>✕</span> PEDIU O CÓDIGO? É GOLPE <span style={{ color: "#A61E3A" }}>✕</span> ANTES DE RESPONDER, PARE E CONFIRME <span style={{ color: "#A61E3A" }}>✕</span></span>
      <span style={{ display: "flex", gap: "28px", paddingRight: "28px", alignItems: "center" }}>O CÓDIGO DO SMS É SÓ SEU <span style={{ color: "#A61E3A" }}>✕</span> PEDIU O CÓDIGO? É GOLPE <span style={{ color: "#A61E3A" }}>✕</span> ANTES DE RESPONDER, PARE E CONFIRME <span style={{ color: "#A61E3A" }}>✕</span> O CÓDIGO DO SMS É SÓ SEU <span style={{ color: "#A61E3A" }}>✕</span> PEDIU O CÓDIGO? É GOLPE <span style={{ color: "#A61E3A" }}>✕</span> ANTES DE RESPONDER, PARE E CONFIRME <span style={{ color: "#A61E3A" }}>✕</span></span>
      </div>
      </div>

      <section id="entenda" data-readable="true" aria-labelledby="entenda-title" style={{ padding: "clamp(72px, 9vw, 128px) 0 clamp(64px, 8vw, 112px)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", display: "flex", flexDirection: "column", gap: "clamp(56px, 7vw, 96px)" }}>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "8px 22px" }}>
      <span aria-hidden="true" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(96px, 12vw, 136px)", lineHeight: ".75", letterSpacing: "-0.04em", color: "#0E6B4B" }}>1</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
      <p style={{ fontFamily: "'Permanent Marker', cursive", fontSize: "25px", lineHeight: "1", color: "#0E6B4B" }}>Entenda:</p>
      <h2 id="entenda-title" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(36px, 4.6vw, 58px)", lineHeight: "1", letterSpacing: "-0.035em" }}>Esse código é a <span style={{ background: "linear-gradient(transparent 58%, #FFD447 58%, #FFD447 92%, transparent 92%)", padding: "0 4px" }}>chave da sua conta.</span></h2>
      </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "28px 56px", marginTop: "clamp(-40px, -3vw, -16px)" }}>
      <p style={{ fontSize: "20px", lineHeight: "1.6", color: "#2E3550", paddingLeft: "22px", borderLeft: "5px solid #FFD447" }}>Quando alguém coloca um WhatsApp num celular novo, o WhatsApp manda um código de 6 números por SMS para o dono do número. É como ele pergunta: <b>“é você mesmo?”</b></p>
      <p style={{ fontSize: "20px", lineHeight: "1.6", color: "#2E3550", paddingLeft: "22px", borderLeft: "5px solid #A61E3A" }}>Quem digita o código fica com a conta. Se você passa para o golpista, <b>ele coloca o seu WhatsApp no celular dele</b>.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}><Cadu mood="assustado" size={64} /><p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.03em", lineHeight: "1.1" }}>Com a sua conta, <span style={{ color: "#A61E3A" }}>o golpista:</span></p></div>
      <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "40px", marginTop: "16px" }}>
      <li style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <span aria-hidden="true" style={{ position: "relative", width: "150px", height: "150px", marginBottom: "6px", borderRadius: "50%", background: "#3DBE7E", border: "3px solid #1C2541", boxShadow: "6px 6px 0 #1C2541", color: "#1C2541", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="70" height="70" style={{ strokeWidth: "2.2" }} viewBox="0 0 24 24"><path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z"></path><path d="M8 9.5h8"></path><path d="M8 12.5h5"></path></svg><span style={{ position: "absolute", left: "-6px", top: "-6px", width: "44px", height: "44px", borderRadius: "50%", background: "#1C2541", color: "#FBF8F1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "20px" }}>a</span></span>
      <h3 style={{ fontWeight: "800", fontSize: "23px", lineHeight: "1.2", letterSpacing: "-0.02em" }}>Lê suas conversas e vê seus contatos.</h3>
      </li>
      <li style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <span aria-hidden="true" style={{ position: "relative", width: "150px", height: "150px", marginBottom: "6px", borderRadius: "50%", background: "#FFD447", border: "3px solid #1C2541", boxShadow: "6px 6px 0 #1C2541", color: "#1C2541", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="70" height="70" style={{ strokeWidth: "2.2" }} viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"></rect><circle cx="12" cy="12" r="2.5"></circle><path d="M6.5 9.5v5"></path><path d="M17.5 9.5v5"></path></svg><span style={{ position: "absolute", left: "-6px", top: "-6px", width: "44px", height: "44px", borderRadius: "50%", background: "#1C2541", color: "#FBF8F1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "20px" }}>b</span></span>
      <h3 style={{ fontWeight: "800", fontSize: "23px", lineHeight: "1.2", letterSpacing: "-0.02em" }}>Pede dinheiro para a sua família em seu nome.</h3>
      <p style={{ fontSize: "17px", color: "#2E3550" }}>É o objetivo dele.</p>
      </li>
      <li style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <span aria-hidden="true" style={{ position: "relative", width: "150px", height: "150px", marginBottom: "6px", borderRadius: "50%", background: "#F0566B", border: "3px solid #1C2541", boxShadow: "6px 6px 0 #1C2541", color: "#1C2541", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="70" height="70" style={{ strokeWidth: "2.2" }} viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2.5"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path><path d="M9.5 16h.01"></path><path d="M12 16h.01"></path><path d="M14.5 16h.01"></path></svg><span style={{ position: "absolute", left: "-6px", top: "-6px", width: "44px", height: "44px", borderRadius: "50%", background: "#A61E3A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "20px" }}>c</span></span>
      <h3 style={{ fontWeight: "800", fontSize: "23px", lineHeight: "1.2", letterSpacing: "-0.02em" }}>Cria uma senha para você não conseguir voltar.</h3>
      </li>
      </ol>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px 64px" }}>
      <div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "14px", padding: "clamp(24px, 3vw, 32px)", background: "#FFFFFF", border: "3px solid #1C2541", borderRadius: "30px", boxShadow: "8px 8px 0 #1C2541" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
      <p style={{ fontFamily: "'Permanent Marker', cursive", fontSize: "25px", lineHeight: "1", color: "#0E6B4B" }}>Por que</p>
      <h3 style={{ fontWeight: "800", fontSize: "clamp(28px, 3vw, 34px)", lineHeight: "1", letterSpacing: "-0.03em" }}><span style={{ background: "linear-gradient(transparent 58%, #9EDFC3 58%, #9EDFC3 92%, transparent 92%)", padding: "0 4px" }}>qualquer pessoa</span> pode cair</h3>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 18px", borderRadius: "18px", background: "#F5EFE6" }}>
      <span aria-hidden="true" style={{ width: "34px", height: "34px", flexShrink: "0", borderRadius: "50%", background: "#FFD447", border: "2px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px" }}>1</span>
      <p style={{ fontSize: "17px", lineHeight: "1.45" }}><b>Parece nada.</b> “É só um número.” O pedido parece pequeno e inofensivo.</p>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 18px", borderRadius: "18px", background: "#F5EFE6" }}>
      <span aria-hidden="true" style={{ width: "34px", height: "34px", flexShrink: "0", borderRadius: "50%", background: "#9EDFC3", border: "2px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px" }}>2</span>
      <p style={{ fontSize: "17px", lineHeight: "1.45" }}><b>Tem pressa.</b> “O código vence em 2 minutos.” A pressa é para você não pensar.</p>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 18px", borderRadius: "18px", background: "#F5EFE6" }}>
      <span aria-hidden="true" style={{ width: "34px", height: "34px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px" }}>3</span>
      <p style={{ fontSize: "17px", lineHeight: "1.45" }}><b>Sabem de você.</b> Seu nome, onde você comprou, o anúncio que você publicou.</p>
      </div>
      </div>
      <div aria-hidden="true" style={{ flex: "0 1 320px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
      <p style={{ position: "relative", transform: "rotate(-3deg)", padding: "12px 22px 13px", borderRadius: "22px", background: "#FFFFFF", border: "3px solid #1C2541", fontFamily: "'Permanent Marker', cursive", fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: "1.1", textAlign: "center", color: "#1C2541" }}>Pediu o código?<br />Desconfia!<svg width="24" height="18" viewBox="0 0 24 18" style={{ position: "absolute", top: "100%", left: "50%", margin: "-3px 0 0 -12px", overflow: "visible" }}><path d="M2 -2 L2 0 L12 16 L22 0 L22 -2 Z" style={{ fill: "#FFFFFF" }}></path><path d="M2 0 L12 16 L22 0" style={{ fill: "none", stroke: "#1C2541", strokeWidth: "3", strokeLinejoin: "round" }}></path></svg></p>
      <div style={{ transform: "rotate(-8deg)" }}><Cadu mood="alerta" size={200} /></div>
      </div>
      </div>

      </div>
      </section>

      <section id="previna" data-readable="true" aria-labelledby="previna-title" style={{ padding: "0 clamp(12px, 2vw, 24px)" }}>
      <div style={{ maxWidth: "1392px", margin: "0 auto", background: "#1C2541", color: "#FFFFFF", borderRadius: "clamp(24px, 3vw, 36px)", padding: "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 76px)", display: "flex", flexDirection: "column", gap: "clamp(48px, 6vw, 72px)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "980px" }}>
      <p style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "13px", fontWeight: "600", letterSpacing: ".12em", textTransform: "uppercase", color: "#D3F1E3" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", letterSpacing: "0", padding: "4px 9px", borderRadius: "8px", background: "#FFD447", color: "#1C2541" }}>02</span>Previna</p>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}><h2 id="previna-title" style={{ fontFamily: "'Permanent Marker', cursive", fontWeight: "400", fontSize: "clamp(22px, 2.4vw, 30px)", color: "#9EDFC3" }}>A regra que resolve quase tudo:</h2></div>
      <p style={{ fontFamily: "'Permanent Marker', cursive", fontSize: "clamp(40px, 6vw, 84px)", lineHeight: "1.05", color: "#FFD447", textTransform: "uppercase" }}>O código do SMS é só seu. Pediu, é golpe. <span style={{ color: "#FFFFFF" }}>Seja quem for.</span></p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3 style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.03em", lineHeight: "1.1" }}>Os <span style={{ color: "#FFD447" }}>5 sinais</span> do golpe do código</h3>
      <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "16px", color: "#1C2541" }}>
      <li style={{ background: "#FFD447", borderRadius: "24px", padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: "12px", transform: "rotate(-1.2deg)", boxShadow: "6px 6px 0 rgba(0,0,0,.28)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span aria-hidden="true" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "46px", lineHeight: "1", letterSpacing: "-0.04em" }}>1</span><span aria-hidden="true" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="26" height="26" viewBox="0 0 24 24" style={{ strokeWidth: "2.2" }}><rect x="5" y="2.5" width="14" height="19" rx="3"></rect><path d="M9 9h.01M12 9h.01M15 9h.01M9 12.5h.01M12 12.5h.01M15 12.5h.01M12 16h.01" style={{ strokeWidth: "3" }}></path></svg></span></div>
      <p style={{ fontSize: "17px", lineHeight: "1.4" }}><b style={{ display: "block", fontSize: "20px", lineHeight: "1.2", marginBottom: "4px" }}>Pedem um código</b>que chegou por SMS. Já basta.</p>
      </li>
      <li style={{ background: "#3DBE7E", borderRadius: "24px", padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: "12px", transform: "rotate(1deg)", boxShadow: "6px 6px 0 rgba(0,0,0,.28)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span aria-hidden="true" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "46px", lineHeight: "1", letterSpacing: "-0.04em" }}>2</span><span aria-hidden="true" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="26" height="26" viewBox="0 0 24 24" style={{ strokeWidth: "2.2" }}><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.4"></path><path d="M12 16.8h.01" style={{ strokeWidth: "3" }}></path></svg></span></div>
      <p style={{ fontSize: "17px", lineHeight: "1.4" }}><b style={{ display: "block", fontSize: "20px", lineHeight: "1.2", marginBottom: "4px" }}>Você não pediu nada.</b>O código chegou do nada.</p>
      </li>
      <li style={{ background: "#F0566B", borderRadius: "24px", padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: "12px", transform: "rotate(-0.8deg)", boxShadow: "6px 6px 0 rgba(0,0,0,.28)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span aria-hidden="true" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "46px", lineHeight: "1", letterSpacing: "-0.04em" }}>3</span><span aria-hidden="true" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="26" height="26" viewBox="0 0 24 24" style={{ strokeWidth: "2.2" }}><circle cx="12" cy="13.5" r="7.5"></circle><path d="M12 10v3.5l2.5 2"></path><path d="M9.5 2.5h5"></path></svg></span></div>
      <p style={{ fontSize: "17px", lineHeight: "1.4" }}><b style={{ display: "block", fontSize: "20px", lineHeight: "1.2", marginBottom: "4px" }}>Pressa.</b>“Vence em 2 minutos.”</p>
      </li>
      <li style={{ background: "#9EDFC3", borderRadius: "24px", padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: "12px", transform: "rotate(1.2deg)", boxShadow: "6px 6px 0 rgba(0,0,0,.28)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span aria-hidden="true" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "46px", lineHeight: "1", letterSpacing: "-0.04em" }}>4</span><span aria-hidden="true" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="26" height="26" viewBox="0 0 24 24" style={{ strokeWidth: "2.2" }}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path></svg></span></div>
      <p style={{ fontSize: "17px", lineHeight: "1.4" }}><b style={{ display: "block", fontSize: "20px", lineHeight: "1.2", marginBottom: "4px" }}>Dizem ser de uma empresa,</b>mas o número é desconhecido.</p>
      </li>
      <li style={{ background: "#F6A5B3", borderRadius: "24px", padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: "12px", transform: "rotate(-1deg)", boxShadow: "6px 6px 0 rgba(0,0,0,.28)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span aria-hidden="true" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "46px", lineHeight: "1", letterSpacing: "-0.04em" }}>5</span><span aria-hidden="true" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#FFFFFF", border: "3px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="26" height="26" viewBox="0 0 24 24" style={{ strokeWidth: "2.2" }}><path d="M3 4.5h11a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7.5L4 15.5V5.5a1 1 0 0 1-1-1z"></path><path d="M18 9h2a1 1 0 0 1 1 1v9.5L17.5 17H11a1 1 0 0 1-1-1v-1"></path></svg></span></div>
      <p style={{ fontSize: "17px", lineHeight: "1.4" }}><b style={{ display: "block", fontSize: "20px", lineHeight: "1.2", marginBottom: "4px" }}>O SMS fala de WhatsApp,</b>mas a conversa era sobre outra coisa.</p>
      </li>
      </ol>
      </div>
      </div>
      </section>

      <section id="disfarces" data-readable="true" aria-labelledby="disfarces-title" style={{ padding: "clamp(72px, 9vw, 120px) 0" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", display: "flex", flexDirection: "column", gap: "48px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", textAlign: "left" }}><Cadu mood="alerta" size={76} /><p style={{ position: "relative", marginBottom: "26px", padding: "8px 16px", borderRadius: "18px", background: "#FFFFFF", border: "3px solid #1C2541", fontFamily: "'Permanent Marker', cursive", fontSize: "20px", lineHeight: "1.2", color: "#0E6B4B" }}>sempre o mesmo golpe, com outra desculpa:<svg aria-hidden="true" width="27" height="20" viewBox="0 0 27 20" style={{ position: "absolute", left: "-18px", bottom: "-1px", overflow: "visible" }}><path d="M27 3 L19 3 L2 18 L19 13 L27 13 Z" style={{ fill: "#FFFFFF" }}></path><path d="M19.5 3 L2 18 L19.5 13" style={{ fill: "none", stroke: "#1C2541", strokeWidth: "3", strokeLinejoin: "round", strokeLinecap: "round" }}></path></svg></p></div>
      <h2 id="disfarces-title" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: "1.04", letterSpacing: "-0.035em", maxWidth: "14em" }}>Os 6 disfarces de quem pede o código</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))", gap: "16px" }}>
      {(disguises).map((g, i2) => (<Fragment key={i2}>
      <article className="cs-card" style={css(g.cardStyle)}>
      <p style={css(g.eyebrowStyle)}>DISFARCE {g.num}</p>
      <h3 style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "24px", letterSpacing: "-0.02em", lineHeight: "1.15" }}>{g.title}</h3>
      <p style={css(g.quoteStyle)}>{g.quote}</p>
      <p style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "auto", fontSize: "16px", lineHeight: "1.5" }}><span style={css(g.checkStyle)}><svg className="ic" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={{ strokeWidth: "3" }}><path d="M5 12.5 10 17l9-10"></path></svg></span><span><b>Faça:</b> {g.action}</span></p>
      </article>
      </Fragment>))}
      </div>
      </div>
      </section>

      <section id="treine" data-readable="true" aria-labelledby="treine-title" style={{ padding: "0 clamp(12px, 2vw, 24px) clamp(72px, 9vw, 120px)" }}>
      <div style={{ maxWidth: "1392px", margin: "0 auto", background: "#FFD447", border: "3px solid #1C2541", borderRadius: "clamp(24px, 3vw, 36px)", padding: "clamp(56px, 7vw, 96px) clamp(16px, 4vw, 40px)" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "48px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", textAlign: "left" }}><Cadu mood="alerta" size={76} /><p style={{ position: "relative", marginBottom: "26px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px 8px 10px", borderRadius: "18px", background: "#FFFFFF", border: "3px solid #1C2541", fontFamily: "'Permanent Marker', cursive", fontSize: "20px", lineHeight: "1.2", color: "#1C2541" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "13px", padding: "4px 8px", borderRadius: "8px", background: "#1C2541", color: "#FFD447" }}>03</span>agora é com você:<svg aria-hidden="true" width="27" height="20" viewBox="0 0 27 20" style={{ position: "absolute", left: "-21px", bottom: "0", overflow: "visible" }}><path d="M27 3 L19 3 L2 18 L19 13 L27 13 Z" style={{ fill: "#FFFFFF" }}></path><path d="M19.5 3 L2 18 L19.5 13" style={{ fill: "none", stroke: "#1C2541", strokeWidth: "3", strokeLinejoin: "round", strokeLinecap: "round" }}></path></svg></p></div>
      <h2 id="treine-title" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(36px, 4.6vw, 60px)", lineHeight: "1.02", letterSpacing: "-0.035em" }}>Você cairia nesse golpe?</h2>
      <p style={{ maxWidth: "32em", fontSize: "18px", color: "#2E3550" }}>Escolha o que responder. É só uma simulação: nada aqui é real e nada é enviado.</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 56px", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ flex: "0 1 340px", display: "flex", justifyContent: "center", padding: "8px 10px" }}>
      <div style={{ position: "relative", width: "312px", maxWidth: "100%", height: "620px", borderRadius: "54px", background: "#1C2541", padding: "14px", transform: "rotate(-2deg)" }}>
      <span aria-hidden="true" style={{ position: "absolute", left: "-8px", top: "150px", width: "10px", height: "48px", borderRadius: "5px 0 0 5px", background: "#1C2541" }}></span>
      <span aria-hidden="true" style={{ position: "absolute", left: "-8px", top: "212px", width: "10px", height: "64px", borderRadius: "5px 0 0 5px", background: "#1C2541" }}></span>
      <span aria-hidden="true" style={{ position: "absolute", right: "-8px", top: "180px", width: "10px", height: "92px", borderRadius: "0 5px 5px 0", background: "#1C2541" }}></span>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "40px", overflow: "hidden", background: "#F1EFEA", display: "flex", flexDirection: "column" }}>
      <span aria-hidden="true" style={{ position: "absolute", top: "12px", left: "50%", marginLeft: "-46px", width: "92px", height: "26px", borderRadius: "999px", background: "#1C2541", zIndex: "3" }}></span>
      <div style={{ flexShrink: "0", display: "flex", alignItems: "center", gap: "10px", padding: "50px 16px 12px", background: "#FFFFFF", borderBottom: "3px solid #1C2541" }}>
      <span aria-hidden="true" style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#D3F1E3", border: "2.5px solid #1C2541", display: "flex", alignItems: "center", justifyContent: "center", color: "#1C2541" }}><svg className="ic" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4"></circle><path d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5"></path></svg></span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}><strong style={{ fontSize: "16px", fontWeight: "800" }}>Entregas Bom Caminho</strong><span style={{ fontSize: "12.5px", fontWeight: "700", color: "#A61E3A" }}>número desconhecido</span></span>
      </div>
      {(showSms) && (<>
      <div role="note" aria-label="Notificação de SMS recebida" className="cs-msg" style={{ position: "absolute", top: "46px", left: "10px", right: "10px", zIndex: "2", display: "flex", gap: "10px", padding: "11px 12px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "4px 4px 0 #1C2541", border: "2.5px solid #1C2541" }}>
      <span aria-hidden="true" style={{ width: "28px", height: "28px", flexShrink: "0", borderRadius: "8px", background: "#0E6B4B", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="14" height="14" viewBox="0 0 24 24" style={{ fill: "#FFFFFF" }}><path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1z"></path></svg></span>
      <span style={{ display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "1.35" }}>
      <span style={{ display: "flex", justifyContent: "space-between", color: "#5B6170", fontSize: "11px" }}><span>Mensagens</span><span>agora</span></span>
      <strong>WhatsApp</strong>
      <span>Seu código do WhatsApp: <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", background: "#FFD447", padding: "0 3px", borderRadius: "3px" }}>482-719</span>. Não compartilhe este código.</span>
      </span>
      </div>
      </>)}
      <div ref={chatRef} role="log" aria-live="polite" aria-label="Conversa simulada" style={css(chatStyle)}>
      {(msgs).map((m, i3) => (<Fragment key={i3}>
      {(m.isScammer) && (<>
      <p className="cs-msg" style={{ alignSelf: "flex-start", maxWidth: "84%", padding: "10px 13px", borderRadius: "14px", background: "#FFFFFF", border: "2px solid #1C2541", fontSize: "14px", lineHeight: "1.45" }}><span style={{ position: "absolute", left: "-9999px" }}>Golpista: </span>{m.text}</p>
      </>)}
      {(m.isUser) && (<>
      <p className="cs-msg" style={{ alignSelf: "flex-end", maxWidth: "84%", padding: "10px 13px", borderRadius: "14px", background: "#D3F1E3", border: "2px solid #1C2541", fontSize: "14px", lineHeight: "1.45" }}><span style={{ position: "absolute", left: "-9999px" }}>Você: </span>{m.text}</p>
      </>)}
      {(m.isSystem) && (<>
      <p className="cs-msg" style={{ alignSelf: "center", padding: "6px 12px", borderRadius: "999px", background: "#FFF4CC", border: "2px solid #1C2541", fontSize: "12px", fontWeight: "700", color: "#1C2541" }}>{m.text}</p>
      </>)}
      </Fragment>))}
      {(typing) && (<>
      <p aria-label="digitando" style={{ alignSelf: "flex-start", display: "flex", gap: "4px", padding: "13px 14px", borderRadius: "14px", background: "#FFFFFF", border: "2px solid #1C2541" }}><span className="cs-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#5B6170" }}></span><span className="cs-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#5B6170" }}></span><span className="cs-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#5B6170" }}></span></p>
      </>)}
      </div>
      <span aria-hidden="true" style={{ position: "absolute", bottom: "10px", left: "50%", marginLeft: "-55px", width: "110px", height: "6px", borderRadius: "999px", background: "#1C2541" }}></span>
      </div>
      </div>
      </div>

      <div style={{ flex: "1 1 400px", maxWidth: "560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px", marginTop: "clamp(0px, 6vw, 88px)", marginLeft: "clamp(0px, 3vw, 44px)" }}>
      <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: "clamp(22px, 3vw, 32px)", display: "flex", flexDirection: "column", gap: "20px", border: "3px solid #1C2541", boxShadow: "8px 8px 0 #1C2541" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
      <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "24px", letterSpacing: "-0.02em" }}>{question}</p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#4A5270", whiteSpace: "nowrap" }}>{progress}</p>
      </div>
      <div aria-hidden="true" style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
      {(stepDots).map((sd, i4) => (<Fragment key={i4}><span style={css(sd.lineStyle)}></span><span style={css(sd.style)}>{sd.n}</span></Fragment>))}
      </div>
      </div>
      {(noResult) && (<>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {(options).map((o, i5) => (<Fragment key={i5}>
      <button type="button" className="cs-opt" onClick={o.pick} disabled={typing} style={{ display: "flex", alignItems: "center", gap: "14px", width: "100%", minHeight: "64px", padding: "12px 18px 12px 12px", borderRadius: "20px", border: "3px solid #1C2541", background: "#FFFFFF", boxShadow: "4px 4px 0 #1C2541", textAlign: "left", fontSize: "17px", fontWeight: "600", lineHeight: "1.35", color: "#1C2541" }}><span aria-hidden="true" style={css(o.letterStyle)}>{o.letter}</span><span>{o.label}</span></button>
      </Fragment>))}
      </div>
      </>)}
      {(hasResult) && (<>
      <div className="cs-msg" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={css(res.bannerStyle)}>
      {(isLost) && (<><Cadu mood="assustado" size={84} /></>)}
      {(isWon) && (<><Cadu mood="trancado" size={84} /></>)}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px", minWidth: "0" }}>
      <span aria-hidden="true" style={css(res.stampStyle)}>{res.stamp}</span>
      <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "22px", lineHeight: "1.15", letterSpacing: "-0.02em", color: "#1C2541" }}>{res.title}</p>
      </div>
      </div>
      <p style={{ fontSize: "17px", lineHeight: "1.5", color: "#2E3550", padding: "0 4px" }}>{res.description}</p>
      {(isLost) && (<>
      <div style={css(res.notesStyle)}>
      {(res.notes).map((nt, i6) => (<Fragment key={i6}>
      <p style={{ fontSize: "15px", lineHeight: "1.5" }}><b>{nt.label}</b> {nt.text}</p>
      </Fragment>))}
      </div>
      </>)}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <a href={res.ctaHref} className="cs-btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "50px", padding: "0 22px", borderRadius: "999px", border: "3px solid #1C2541", background: "#1C2541", color: "#FFFFFF", boxShadow: "4px 4px 0 #FFD447", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>{res.ctaLabel}<svg className="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ strokeWidth: "3" }}><path d="m9 6 6 6-6 6"></path></svg></a>
      <button type="button" className="cs-btn" onClick={reset} style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "50px", padding: "0 20px", borderRadius: "999px", border: "3px solid #1C2541", background: "#FFFFFF", boxShadow: "4px 4px 0 #1C2541", fontWeight: "700", fontSize: "15px" }}><svg className="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ strokeWidth: "2.4" }}><path d="M4 12a8 8 0 1 0 2.5-5.8"></path><path d="M4 3v4h4"></path></svg>Tentar de novo</button>
      </div>
      </div>
      </>)}
      </div>
      <p style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#4A5270", paddingLeft: "8px" }}><svg className="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "#0E6B4B" }}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"></path></svg>Nada que você escolher aqui sai desta página.</p>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section id="conta" data-readable="true" aria-labelledby="conta-title" style={{ padding: "clamp(72px, 9vw, 128px) 0" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", display: "flex", flexDirection: "column", gap: "clamp(56px, 7vw, 88px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "center" }}>
      <div style={{ flex: "1 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", marginBottom: "4px" }}><Cadu mood="trancado" size={76} /><p style={{ position: "relative", marginBottom: "26px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px 8px 10px", borderRadius: "18px", background: "#FFFFFF", border: "3px solid #1C2541", fontFamily: "'Permanent Marker', cursive", fontSize: "20px", lineHeight: "1.2", color: "#0E6B4B" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "13px", padding: "4px 8px", borderRadius: "8px", background: "#0E6B4B", color: "#FFFFFF" }}>04</span>a proteção mais importante:<svg aria-hidden="true" width="27" height="20" viewBox="0 0 27 20" style={{ position: "absolute", left: "-21px", bottom: "0", overflow: "visible" }}><path d="M27 3 L19 3 L2 18 L19 13 L27 13 Z" style={{ fill: "#FFFFFF" }}></path><path d="M19.5 3 L2 18 L19.5 13" style={{ fill: "none", stroke: "#1C2541", strokeWidth: "3", strokeLinejoin: "round", strokeLinecap: "round" }}></path></svg></p></div>
      <h2 id="conta-title" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(36px, 4.6vw, 60px)", lineHeight: "1.02", letterSpacing: "-0.035em" }}>Tranque seu WhatsApp com uma senha extra</h2>
      <p style={{ maxWidth: "34em", fontSize: "18px", color: "#2E3550" }}>Isso se chama <b>verificação em duas etapas</b>. Você cria uma senha dentro do WhatsApp, uma vez só. Daí em diante, para abrir a sua conta em outro celular, é preciso <b>o código do SMS e a sua senha</b>.</p>
      </div>
      <div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px", background: "#FFD447", border: "3px solid #1C2541", boxShadow: "8px 8px 0 #1C2541", borderRadius: "28px", padding: "clamp(20px, 3vw, 32px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}><Cadu mood="trancado" size={64} /><p style={{ fontWeight: "800", fontSize: "clamp(22px, 2.4vw, 28px)", letterSpacing: "-0.02em", lineHeight: "1.15" }}>Tranque com duas trancas</p></div>
      <div role="img" aria-label="Código do SMS mais a sua senha é igual a conta trancada. O golpista consegue o código numa conversa, mas a senha só você sabe." style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: "10px" }}>
      <div style={{ flex: "1 1 130px", padding: "18px", borderRadius: "20px", background: "#FFFFFF", border: "3px solid #1C2541", display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: ".12em", color: "#4A5270" }}>CÓDIGO DO SMS</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "24px" }}>482-719</span>
      </div>
      <span aria-hidden="true" style={{ alignSelf: "center", fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "30px", color: "#1C2541" }}>+</span>
      <div style={{ flex: "1 1 130px", padding: "18px", borderRadius: "20px", background: "#3DBE7E", border: "3px solid #1C2541", display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: ".12em", color: "#1C2541" }}>SUA SENHA</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "24px", letterSpacing: ".1em" }}>••••••</span>
      </div>
      <span aria-hidden="true" style={{ alignSelf: "center", fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "30px", color: "#1C2541" }}>=</span>
      <div style={{ flex: "1 1 150px", padding: "18px", borderRadius: "20px", background: "#1C2541", border: "3px solid #1C2541", boxShadow: "4px 4px 0 #FFFFFF", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "10px" }}>
      <svg className="ic" width="34" height="34" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "#9EDFC3", strokeWidth: "2.2" }}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"></path><path d="M8.8 12l2.3 2.3 4.3-4.6"></path></svg>
      <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "19px", lineHeight: "1.1" }}>conta trancada!</span>
      </div>
      </div>
      <p style={{ fontSize: "16px", color: "#2E3550" }}>O golpista consegue o código numa conversa. <b>A senha, só você sabe.</b> Sem ela, ele não entra.</p>
      </div>
      </div>

      <div style={{ background: "#FFFFFF", border: "3px solid #1C2541", boxShadow: "8px 8px 0 #1C2541", borderRadius: "32px", padding: "clamp(24px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: "36px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
      <h3 style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(26px, 3vw, 34px)", letterSpacing: "-0.03em" }}>Ative em 1 minuto</h3>
      <div role="group" aria-label="Seu celular" style={{ display: "inline-flex", gap: "4px", padding: "4px", borderRadius: "999px", background: "#FFFFFF", border: "3px solid #1C2541", boxShadow: "4px 4px 0 #1C2541" }}>
      {(platforms).map((pl, i7) => (<Fragment key={i7}>
      <button type="button" onClick={pl.pick} aria-pressed={pl.pressed} style={css(pl.style)}>{pl.label}</button>
      </Fragment>))}
      </div>
      </div>
      <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: "32px 20px" }}>
      {(howto).map((st, i8) => (<Fragment key={i8}>
      <li style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
      <div aria-hidden="true" style={{ position: "relative", width: "188px", height: "372px", borderRadius: "38px", background: "#1C2541", padding: "10px", flexShrink: "0", transform: `rotate(${st.tilt})` }}>
      <span style={{ position: "absolute", left: "-6px", top: "86px", width: "8px", height: "30px", borderRadius: "4px 0 0 4px", background: "#1C2541" }}></span>
      <span style={{ position: "absolute", left: "-6px", top: "126px", width: "8px", height: "42px", borderRadius: "4px 0 0 4px", background: "#1C2541" }}></span>
      <span style={{ position: "absolute", right: "-6px", top: "106px", width: "8px", height: "58px", borderRadius: "0 4px 4px 0", background: "#1C2541" }}></span>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "29px", overflow: "hidden", background: "#FFFFFF", fontSize: "11px", lineHeight: "1.3", color: "#1C2541" }}>
      <span style={{ position: "absolute", top: "9px", left: "50%", marginLeft: "-31px", width: "62px", height: "18px", borderRadius: "999px", background: "#1C2541", zIndex: "2" }}></span>
      <span style={{ position: "absolute", bottom: "6px", left: "50%", marginLeft: "-32px", width: "64px", height: "4px", borderRadius: "999px", background: "#1C2541", zIndex: "3" }}></span>
      {(st.isMenu) && (<>
      <div style={{ padding: "34px 12px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "700", fontSize: "14px", color: "#0E6B4B" }}>WhatsApp<svg width="14" height="14" viewBox="0 0 24 24" style={{ fill: "#1C2541" }}><circle cx="12" cy="5" r="2.2"></circle><circle cx="12" cy="12" r="2.2"></circle><circle cx="12" cy="19" r="2.2"></circle></svg></div>
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "12px" }}>
      {(ghost5).map((gh, i9) => (<Fragment key={i9}><span style={{ display: "flex", gap: "8px", alignItems: "center" }}><span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#E3E8F0" }}></span><span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ height: "5px", width: "70%", borderRadius: "3px", background: "#E3E8F0" }}></span><span style={{ height: "5px", width: "45%", borderRadius: "3px", background: "#EEF1F6" }}></span></span></span></Fragment>))}
      </div>
      <div style={{ position: "absolute", top: "52px", right: "8px", width: "120px", background: "#FFFFFF", borderRadius: "10px", boxShadow: "0 10px 24px -8px rgba(28,37,65,.4)", border: "1px solid #E6E0D2", padding: "4px", display: "flex", flexDirection: "column" }}>
      <span style={{ padding: "8px", fontSize: "10.5px" }}>Novo grupo</span>
      <span style={{ padding: "8px", fontSize: "10.5px" }}>Mensagens favoritas</span>
      <span style={{ padding: "8px", fontSize: "10.5px", fontWeight: "700", background: "#FFF4CC", borderRadius: "7px", outline: "1.5px solid #1C2541" }}>Configurações</span>
      </div>
      </>)}
      {(st.isTabs) && (<>
      <div style={{ padding: "34px 12px 0", fontWeight: "700", fontSize: "14px" }}>Conversas</div>
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "12px" }}>
      {(ghost4).map((gh, i10) => (<Fragment key={i10}><span style={{ display: "flex", gap: "8px", alignItems: "center" }}><span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#E3E8F0" }}></span><span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ height: "5px", width: "70%", borderRadius: "3px", background: "#E3E8F0" }}></span><span style={{ height: "5px", width: "45%", borderRadius: "3px", background: "#EEF1F6" }}></span></span></span></Fragment>))}
      </div>
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "8px 6px 18px", borderTop: "1px solid #E6E0D2", background: "#FAFAFC", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", textAlign: "center", fontSize: "9.5px" }}>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", color: "#5B6170" }}><span style={{ width: "16px", height: "16px", borderRadius: "5px", background: "#D5DBE6" }}></span>Ligações</span>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", color: "#5B6170" }}><span style={{ width: "16px", height: "16px", borderRadius: "5px", background: "#D5DBE6" }}></span>Conversas</span>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", fontWeight: "700", background: "#FFF4CC", borderRadius: "8px", outline: "1.5px solid #1C2541", padding: "2px 0" }}><span style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#1C2541" }}></span>Você</span>
      </div>
      </>)}
      {(st.isList) && (<>
      <div style={{ padding: "34px 12px 8px", display: "flex", alignItems: "center", gap: "4px", fontWeight: "700", fontSize: "14px" }}>{(st.back) && (<><svg className="ic" width="12" height="12" viewBox="0 0 24 24" style={{ strokeWidth: "3" }}><path d="M15 5l-7 7 7 7"></path></svg></>)}{st.title}</div>
      {(st.profile) && (<>
      <div style={{ margin: "0 12px 8px", display: "flex", gap: "8px", alignItems: "center", paddingBottom: "10px", borderBottom: "1px solid #EEF1F6" }}><span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E3E8F0" }}></span><span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ height: "6px", width: "60%", borderRadius: "3px", background: "#E3E8F0" }}></span><span style={{ height: "5px", width: "40%", borderRadius: "3px", background: "#EEF1F6" }}></span></span></div>
      </>)}
      <div style={{ padding: "0 8px", display: "flex", flexDirection: "column", gap: "2px" }}>
      {(st.rows).map((r, i11) => (<Fragment key={i11}><span style={css(r.style)}><span>{r.label}</span><svg className="ic" width="10" height="10" viewBox="0 0 24 24" style={{ strokeWidth: "3" }}><path d="M9 5l7 7-7 7"></path></svg></span></Fragment>))}
      </div>
      </>)}
      {(st.isForm) && (<>
      <div style={{ padding: "34px 12px 0", display: "flex", alignItems: "center", gap: "4px", fontWeight: "700", fontSize: "14px" }}><svg className="ic" width="12" height="12" viewBox="0 0 24 24" style={{ strokeWidth: "3" }}><path d="M15 5l-7 7 7 7"></path></svg>Duas etapas</div>
      <div style={{ padding: "26px 14px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
      <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#D3F1E3", color: "#0E6B4B", display: "flex", alignItems: "center", justifyContent: "center" }}><svg className="ic" width="22" height="22" viewBox="0 0 24 24" style={{ strokeWidth: "2.4" }}><rect x="5" y="11" width="14" height="10" rx="2.5"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg></span>
      <span style={{ fontWeight: "700", fontSize: "13px" }}>Crie uma senha</span>
      <span style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1.5px solid #1C2541", fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".2em", fontSize: "12px" }}>••••••••</span>
      <span style={{ fontSize: "9.5px", color: "#5B6170" }}>8 ou mais, com letra e número</span>
      <span style={{ marginTop: "26px", width: "100%", padding: "9px", borderRadius: "999px", background: "#0E6B4B", color: "#FFFFFF", fontWeight: "700", fontSize: "11px" }}>Avançar</span>
      </div>
      </>)}
      </div>
      </div>
      <p style={{ display: "flex", gap: "12px", alignItems: "flex-start", maxWidth: "260px", fontSize: "16px", lineHeight: "1.5" }}><span aria-hidden="true" style={css(st.numStyle)}>{st.num}</span><span>{(st.caption).map((seg, i12) => (<Fragment key={i12}>{(seg.b) && (<><b>{seg.t}</b></>)}{(seg.n) && (<>{seg.t}</>)}</Fragment>))}</span></p>
      </li>
      </Fragment>))}
      </ol>
      <p style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "16px 20px", borderRadius: "18px", background: "#FFF4CC", border: "3px solid #1C2541", fontSize: "16px" }}><svg className="ic" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ marginTop: "3px" }}><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5"></path><path d="M12 8h.01"></path></svg><span>Em alguns celulares aparece um <b>PIN de 6 números</b> no lugar da senha, e os menus mudam um pouco de nome. Funciona do mesmo jeito.</span></p>
      </div>
      </div>
      </section>

      <section id="video" data-readable="true" aria-labelledby="video-title" style={{ background: "#1C2541", color: "#FFFFFF", padding: "clamp(72px, 9vw, 120px) 0" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", display: "flex", flexDirection: "column", gap: "44px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 40px", alignItems: "flex-end", justifyContent: "space-between" }}>
      <div style={{ flex: "1 1 520px", display: "flex", flexDirection: "column", gap: "16px", maxWidth: "680px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "24px" }}><Cadu mood="alerta" size={76} /><p style={{ position: "relative", marginBottom: "26px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px 8px 10px", borderRadius: "18px", background: "#FFD447", border: "3px solid #FFFFFF", fontFamily: "'Permanent Marker', cursive", fontSize: "20px", lineHeight: "1.2", color: "#1C2541" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "13px", padding: "4px 8px", borderRadius: "8px", background: "#1C2541", color: "#FFD447" }}>05</span>prefere assistir?<svg aria-hidden="true" width="27" height="20" viewBox="0 0 27 20" style={{ position: "absolute", left: "-21px", bottom: "0", overflow: "visible" }}><path d="M27 3 L19 3 L2 18 L19 13 L27 13 Z" style={{ fill: "#FFD447" }}></path><path d="M19.5 3 L2 18 L19.5 13" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "3", strokeLinejoin: "round", strokeLinecap: "round" }}></path></svg></p></div>
      <h2 id="video-title" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(36px, 4.6vw, 60px)", lineHeight: "1.02", letterSpacing: "-0.035em" }}>O golpe em <span style={{ color: "#FFD447" }}>7 minutos</span></h2>
      <p style={{ fontSize: "18px", color: "#C9CFE0" }}>O Pablo quase caiu no golpe. Veja como ele percebeu a tempo e como trancar o WhatsApp, passo a passo, na tela do celular.</p>
      </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "stretch" }}>
      <div style={{ flex: "999 1 560px", minWidth: "0" }}>
      <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "24px", overflow: "hidden", background: "#0F1530", border: "1px solid rgba(255,255,255,.12)" }}>
      {(videoPlaying) && (<>
      <iframe
        key={activeStart}
        src={`https://www.youtube-nocookie.com/embed/${VIDEO.youtubeId}?autoplay=1&rel=0&cc_load_policy=1&cc_lang_pref=pt&hl=pt-BR&start=${activeStart}`}
        title={`Vídeo: ${activeTitle}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ position: "absolute", inset: "0", width: "100%", height: "100%", border: "0" }}
      />
      </>)}
      {(videoIdle) && (<>
      <button type="button" onClick={playVideo} disabled={videoLocked} aria-label={coverLabel} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", padding: "0", border: "0", background: "transparent", display: "block" }}>
      <img src="/video/capa.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {(videoAvailable) && (<>
      <span aria-hidden="true" className="cs-btn" style={{ position: "absolute", left: "50%", top: "50%", width: "96px", height: "96px", margin: "-48px 0 0 -48px", borderRadius: "50%", background: "#FFD447", color: "#1C2541", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 40px -12px rgba(0,0,0,.6)" }}><svg width="38" height="38" viewBox="0 0 24 24" style={{ fill: "currentColor", marginLeft: "4px" }}><path d="M7 4.5v15l13-7.5z"></path></svg></span>
      </>)}
      {(videoLocked) && (<>
      <span aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(15,21,48,.55)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ padding: "12px 22px", borderRadius: "999px", background: "#FFFFFF", color: "#1C2541", fontWeight: "700", fontSize: "16px", letterSpacing: ".02em" }}>Em breve</span></span>
      </>)}
      </button>
      </>)}
      </div>
      </div>

      <div style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
      <p style={{ fontSize: "13px", fontWeight: "600", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9CFE0" }}>O que você vai ver</p>
      <ol style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {(chapters).map((c, i13) => (<Fragment key={i13}>
      <li><button type="button" className="cs-chapter" onClick={c.pick} disabled={videoLocked} style={css(c.style)}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "14px", color: "#FFD447", minWidth: "42px", paddingTop: "2px" }}>{c.time}</span><span style={{ display: "flex", flexDirection: "column", gap: "2px", flex: "1" }}><span style={{ fontWeight: "600", fontSize: "16px", lineHeight: "1.35" }}>{c.title}</span><span style={{ fontSize: "14px", color: "#C9CFE0", lineHeight: "1.4" }}>{c.text}</span></span><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ fill: "currentColor", opacity: ".7", marginTop: "4px", flexShrink: "0" }}><path d="M7 4.5v15l13-7.5z"></path></svg></button></li>
      </Fragment>))}
      </ol>
      <p style={{ fontSize: "14px", color: "#AEB6CC", paddingLeft: "4px" }}>{videoHint}</p>
      </div>
      </div>
      </div>
      </section>

      <section id="agora" data-readable="true" aria-labelledby="agora-title" style={{ background: "#FBF8F1", padding: "clamp(24px, 4vw, 56px) 0 clamp(72px, 9vw, 120px)" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", display: "flex", flexDirection: "column", gap: "40px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "24px" }}><Cadu mood="assustado" size={88} /><p style={{ position: "relative", marginBottom: "30px", padding: "10px 18px", borderRadius: "20px", background: "#FFFFFF", border: "3px solid #A61E3A", color: "#A61E3A", fontFamily: "'Permanent Marker', cursive", fontSize: "22px", lineHeight: "1.2" }}>Calma, dá para resolver!<svg aria-hidden="true" width="27" height="20" viewBox="0 0 27 20" style={{ position: "absolute", left: "-21px", bottom: "0", overflow: "visible" }}><path d="M27 3 L19 3 L2 18 L19 13 L27 13 Z" style={{ fill: "#FFFFFF" }}></path><path d="M19.5 3 L2 18 L19.5 13" style={{ fill: "none", stroke: "#A61E3A", strokeWidth: "3", strokeLinejoin: "round", strokeLinecap: "round" }}></path></svg></p></div>
      <h2 id="agora-title" style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(38px, 5vw, 64px)", lineHeight: "1", letterSpacing: "-0.04em" }}>Passei o código. E agora?</h2>
      <p style={{ maxWidth: "36em", fontSize: "18px", color: "#2E3550" }}><b>Seu WhatsApp ainda funciona?</b> Então corra e <a href="#conta" style={{ color: "#A61E3A", fontWeight: "600" }}>crie agora a senha extra</a>. Com ela, o código sozinho não serve para nada. <b>Se já perdeu o acesso</b>, siga os passos abaixo.</p>
      </div>

      <div style={{ background: "#FFFFFF", border: "3px solid #A61E3A", boxShadow: "8px 8px 0 #A61E3A", borderRadius: "32px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "8px 24px", padding: "24px clamp(20px, 4vw, 48px)", background: "#A61E3A", color: "#FFFFFF" }}>
      <h3 style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.025em" }}>Perdeu o WhatsApp? Faça isto, nesta ordem.</h3>
      <p style={{ fontSize: "15px", color: "#FFE3E9" }}>Toque nas perguntas amarelas se for o seu caso.</p>
      </div>
      <ol style={{ display: "flex", flexDirection: "column", padding: "clamp(24px, 4vw, 44px) clamp(20px, 4vw, 48px)" }}>

      <li style={{ display: "flex", gap: "clamp(14px, 2.4vw, 24px)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><span aria-hidden="true" style={{ width: "44px", height: "44px", flexShrink: "0", borderRadius: "50%", background: "#A61E3A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "18px" }}>1</span><span style={{ flex: "1", width: "2px", background: "#F1D3DA", margin: "6px 0" }}></span></div>
      <div style={{ flex: "1", minWidth: "0", paddingBottom: "36px", display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
      <h4 style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "22px", letterSpacing: "-0.02em" }}>Avise a família e os amigos</h4>
      <p style={{ color: "#2E3550" }}>Ligue ou mande por outro aplicativo: “Roubaram meu WhatsApp. Não façam nenhum Pix.”</p>
      <div style={{ borderRadius: "18px", background: "#FFF4CC", overflow: "hidden" }}>
      <button type="button" onClick={toggleQ1} aria-expanded={q1Open} style={{ width: "100%", minHeight: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 18px", border: "0", background: "transparent", textAlign: "left", fontWeight: "600", fontSize: "16px" }}><span>Alguém já fez Pix para o golpista?</span><svg className="ic" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ strokeWidth: "2.6", transition: "transform .2s ease", transform: `rotate(${q1Rot})` }}><path d="M6 9l6 6 6-6"></path></svg></button>
      {(q1Open) && (<>
      <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "16px" }}>
      <p>Quem fez o Pix deve <b>ligar agora para o próprio banco</b> (o número fica atrás do cartão), dizer que foi golpe e <b>pedir o MED</b>.</p>
      <div style={{ background: "#FFFFFF", borderRadius: "14px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <p style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", color: "#0E6B4B" }}>O QUE É O MED?</p>
      <p>É o <b>Mecanismo Especial de Devolução</b> do Pix. Funciona assim: o seu banco avisa o banco do golpista, que <b>bloqueia o dinheiro</b> se ele ainda estiver na conta e analisa o caso em até 7 dias. Se for golpe, o valor volta para você.</p>
      <p>Dá para pedir até <b>80 dias</b> depois do Pix, mas <b>quanto antes, maior a chance</b>: o golpista costuma passar o dinheiro adiante rápido.</p>
      </div>
      </div>
      </>)}
      </div>
      </div>
      </li>

      <li style={{ display: "flex", gap: "clamp(14px, 2.4vw, 24px)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><span aria-hidden="true" style={{ width: "44px", height: "44px", flexShrink: "0", borderRadius: "50%", background: "#A61E3A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "18px" }}>2</span><span style={{ flex: "1", width: "2px", background: "#F1D3DA", margin: "6px 0" }}></span></div>
      <div style={{ flex: "1", minWidth: "0", paddingBottom: "36px", display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
      <h4 style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "22px", letterSpacing: "-0.02em" }}>Entre de novo no seu WhatsApp</h4>
      <p style={{ color: "#2E3550" }}>Abra o aplicativo, toque em <b>Acessar conta novamente</b> e digite o código que chegar por SMS. Isso tira o golpista da sua conta.</p>
      <div style={{ borderRadius: "18px", background: "#FFF4CC", overflow: "hidden" }}>
      <button type="button" onClick={toggleQ2} aria-expanded={q2Open} style={{ width: "100%", minHeight: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 18px", border: "0", background: "transparent", textAlign: "left", fontWeight: "600", fontSize: "16px" }}><span>Pediu uma senha que você não criou?</span><svg className="ic" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ strokeWidth: "2.6", transition: "transform .2s ease", transform: `rotate(${q2Rot})` }}><path d="M6 9l6 6 6-6"></path></svg></button>
      {(q2Open) && (<>
      <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "16px" }}>
      <p>O golpista criou uma senha na sua conta. <b>Não precisa abrir chamado nem mandar e-mail: é só esperar.</b></p>
      <ol style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#FFFFFF", borderRadius: "14px", padding: "18px" }}>
      <li style={{ display: "flex", gap: "10px" }}><b style={{ fontFamily: "'JetBrains Mono', monospace", color: "#0E6B4B" }}>1.</b><span>Na tela da senha, toque em <b>Esqueceu a senha?</b> (ou <b>Esqueceu o PIN?</b>) e confirme.</span></li>
      <li style={{ display: "flex", gap: "10px" }}><b style={{ fontFamily: "'JetBrains Mono', monospace", color: "#0E6B4B" }}>2.</b><span>Espere <b>7 dias</b> com o WhatsApp instalado e o chip no celular. O golpista já está fora e não consegue voltar.</span></li>
      <li style={{ display: "flex", gap: "10px" }}><b style={{ fontFamily: "'JetBrains Mono', monospace", color: "#0E6B4B" }}>3.</b><span>Depois, peça um <b>novo código por SMS</b> e entre. A conta é sua de novo.</span></li>
      </ol>
      </div>
      </>)}
      </div>
      </div>
      </li>

      <li style={{ display: "flex", gap: "clamp(14px, 2.4vw, 24px)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><span aria-hidden="true" style={{ width: "44px", height: "44px", flexShrink: "0", borderRadius: "50%", background: "#A61E3A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "18px" }}>3</span><span style={{ flex: "1", width: "2px", background: "#F1D3DA", margin: "6px 0" }}></span></div>
      <div style={{ flex: "1", minWidth: "0", paddingBottom: "36px", display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
      <h4 style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "22px", letterSpacing: "-0.02em" }}>Registre o boletim de ocorrência</h4>
      <p style={{ color: "#2E3550" }}>Pela internet, na <b>Delegacia Eletrônica</b> do seu estado (<a href="https://www.delegaciaeletronica.policiacivil.sp.gov.br/" target="_blank" rel="noopener noreferrer" style={{ color: "#A61E3A", fontWeight: "600" }}>a de São Paulo fica aqui</a>). Guarde prints da conversa e o número do golpista.</p>
      </div>
      </li>

      <li style={{ display: "flex", gap: "clamp(14px, 2.4vw, 24px)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><span aria-hidden="true" style={{ width: "44px", height: "44px", flexShrink: "0", borderRadius: "50%", background: "#0E6B4B", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "18px" }}>4</span></div>
      <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
      <h4 style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "22px", letterSpacing: "-0.02em" }}>Tranque a conta de volta</h4>
      <p style={{ color: "#2E3550" }}>Ative a <b>verificação em duas etapas</b> para isso não acontecer de novo. <a href="#conta" style={{ color: "#0E6B4B", fontWeight: "600" }}>O que é isso?</a></p>
      </div>
      </li>

      </ol>
      </div>
      </div>
      </section>



      </main>

      <footer style={{ background: "#1C2541", color: "#C9CFE0", padding: "clamp(56px, 7vw, 88px) 0 40px" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", display: "flex", flexDirection: "column", gap: "44px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px" }}><Cadu mood="trancado" size={110} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: "800", fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.04em", lineHeight: "1", color: "#FFFFFF" }}>Código Seguro</p>
      <p style={{ fontSize: "18px", color: "#FFD447" }}>Antes de responder, pare e confirme.</p>
      </div>
      </div>
      <span style={{ padding: "8px 16px", borderRadius: "999px", border: "1px solid rgba(255,255,255,.25)", fontSize: "14px", color: "#FFFFFF" }}>Projeto de extensão</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "32px", paddingTop: "32px", borderTop: "3px dashed rgba(255,255,255,.35)", fontSize: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}><p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".14em", textTransform: "uppercase", color: "#AEB6CC" }}>O projeto</p><p>Um projeto de extensão da <b style={{ color: "#FFFFFF" }}>Universidade de Mogi das Cruzes (UMC)</b>, feito por alunos para ajudar a sociedade a se proteger do golpe do código do WhatsApp.</p></div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}><p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".14em", textTransform: "uppercase", color: "#AEB6CC" }}>Curso</p><p>Engenharia de Software<br />8B Noturno · 2026</p></div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}><p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".14em", textTransform: "uppercase", color: "#AEB6CC" }}>Quem fez</p><ul style={{ display: "flex", flexDirection: "column", gap: "2px" }}><li>Mauro Junior</li><li>Pablo de Souza</li><li>Victor Teixeira</li></ul></div>
      </div>
      <p style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#AEB6CC" }}><svg className="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "#9EDFC3" }}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"></path></svg>Este site não coleta nenhum dado seu.</p>
      </div>
      </footer>
      </div>

      <aside aria-label="Letra e leitura em voz alta" style={{ position: "fixed", right: "clamp(12px, 2vw, 24px)", bottom: "clamp(12px, 2vw, 24px)", zIndex: "50", display: "flex", gap: "6px", padding: "6px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E6E0D2", boxShadow: "0 12px 32px -14px rgba(28,37,65,.45)" }}>
      <button type="button" onClick={toggleLarge} aria-pressed={large} aria-label={largeLabel} style={css(largeStyle)}>A+</button>
      {(speechSupported) && (<>
      <button type="button" onClick={toggleSpeak} aria-pressed={speaking} style={css(speakStyle)}><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" style={{ fill: "currentColor" }}></path><path d="M16.5 8.5a5 5 0 0 1 0 7" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }}></path></svg>{speakLabel}</button>
      </>)}
      </aside>
      </div>
    );
  }
}
