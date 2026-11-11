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
