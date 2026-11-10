import { useState } from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { ShieldCheckIcon } from '../components/Icons';
import { PHONE_STEPS } from '../components/StepScreens';
import type { DevicePlatform } from '../types';

const PLATFORMS: { id: DevicePlatform; label: string }[] = [
  { id: 'android', label: 'Android' },
  { id: 'iphone', label: 'iPhone' },
];

export function Lock() {
  const [platform, setPlatform] = useState<DevicePlatform>('android');

  return (
    <section id="conta" className="part part--conta" aria-labelledby="conta-title" data-readable>
      <div className="container">
        <div className="lock-intro">
          <div>
            <p className="kicker">a proteção mais importante:</p>
            <h2 id="conta-title" className="h2">
              Tranque seu WhatsApp com uma senha extra
            </h2>
            <p className="lead">
              Isso se chama <b>verificação em duas etapas</b>. Você cria uma senha dentro do WhatsApp, uma vez só. Daí
              em diante, para abrir a sua conta em outro celular, é preciso <b>o código do SMS e a sua senha</b>.
            </p>
          </div>

          <div
            className="lock-sum"
            role="img"
            aria-label="Código do SMS mais a sua senha é igual a conta trancada. O golpista consegue o código numa conversa, mas a senha só você sabe."
          >
            <div className="lock-sum__row" aria-hidden="true">
              <div className="lock-sum__part">
                <span className="lock-sum__label">CÓDIGO DO SMS</span>
                <span className="lock-sum__value">482-719</span>
              </div>
              <span className="lock-sum__op">+</span>
              <div className="lock-sum__part">
                <span className="lock-sum__label lock-sum__label--green">SUA SENHA</span>
                <span className="lock-sum__value lock-sum__value--dots">••••••</span>
              </div>
              <span className="lock-sum__op">=</span>
              <div className="lock-sum__result">
                <ShieldCheckIcon size={34} />
                <span>conta trancada!</span>
              </div>
            </div>
            <p className="lock-sum__note" aria-hidden="true">
              O golpista consegue o código numa conversa. <b>A senha, só você sabe.</b> Sem ela, ele não entra.
            </p>
          </div>
        </div>

        <div className="howto">
          <div className="howto__head">
            <h3 className="h3">Ative em 1 minuto</h3>
            <div className="toggle" role="group" aria-label="Seu celular">
              {PLATFORMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={platform === item.id}
                  onClick={() => setPlatform(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <ol className="phone-steps">
            {PHONE_STEPS[platform].map((step, index) => (
              <li key={`${platform}-${index}`} className="phone-steps__item">
                <div className="phone-steps__phone" aria-hidden="true">
                  <PhoneFrame width={176} height={330} fullScreen>
                    <span className="mini">{step.screen}</span>
                  </PhoneFrame>
                </div>
                <p className="phone-steps__caption">
                  <span className="num phone-steps__num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{step.caption}</span>
                </p>
              </li>
            ))}
          </ol>

          <p className="howto__pin">
            Em alguns celulares aparece um <b>PIN de 6 números</b> no lugar da senha, e os menus mudam um pouco de nome.
            Funciona do mesmo jeito.
          </p>
        </div>
      </div>
    </section>
  );
}
