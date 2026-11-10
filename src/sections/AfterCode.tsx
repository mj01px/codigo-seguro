import type { ReactNode } from 'react';
import { ChapterLabel } from '../components/ChapterLabel';
import { ChevronDownIcon } from '../components/Icons';

const DELEGACIA_SP = 'https://www.delegaciaeletronica.policiacivil.sp.gov.br/';

function Question({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details className="question" open={defaultOpen}>
      <summary>
        <span>{title}</span>
        <ChevronDownIcon />
      </summary>
      <div className="question__body">{children}</div>
    </details>
  );
}

export function AfterCode() {
  return (
    <section id="agora" className="part part--agora" aria-labelledby="agora-title" data-readable>
      <div className="container">
        <ChapterLabel number={3} label="Calma, dá para resolver:" tone="white" />
        <h2 id="agora-title" className="h2 agora__title">
          Passei o código. E agora?
        </h2>

        <p className="agora__lead">
          <b>Seu WhatsApp ainda funciona?</b> Então corra e <a href="#conta">crie agora a senha extra</a>. Com ela, o
          código sozinho não serve para nada. <b>Se já perdeu o acesso</b>, siga os passos abaixo.
        </p>

        <div className="recovery">
          <div className="recovery__head">
            <h3>Perdeu o WhatsApp? Faça isto, nesta ordem.</h3>
            <p>Toque nas perguntas amarelas se for o seu caso.</p>
          </div>
          <ol className="recovery__steps">
            <li>
              <span className="recovery__num" aria-hidden="true">
                1
              </span>
              <div>
                <h4>Avise a família e os amigos</h4>
                <p>Ligue ou mande por outro aplicativo: “Roubaram meu WhatsApp. Não façam nenhum Pix.”</p>
                <Question title="Alguém já fez Pix para o golpista?" defaultOpen>
                  <p>
                    Quem fez o Pix deve <b>ligar agora para o próprio banco</b> (o número fica atrás do cartão), dizer
                    que foi golpe e <b>pedir o MED</b>.
                  </p>
                  <div className="med">
                    <p className="med__label">O QUE É O MED?</p>
                    <p>
                      É o <b>Mecanismo Especial de Devolução</b> do Pix. Funciona assim: o seu banco avisa o banco do
                      golpista, que <b>bloqueia o dinheiro</b> se ele ainda estiver na conta e analisa o caso em até 7
                      dias. Se for golpe, o valor volta para você.
                    </p>
                    <p>
                      Dá para pedir até <b>80 dias</b> depois do Pix, mas <b>quanto antes, maior a chance</b>: o
                      golpista costuma passar o dinheiro adiante rápido.
                    </p>
                  </div>
                </Question>
              </div>
            </li>
            <li>
              <span className="recovery__num" aria-hidden="true">
                2
              </span>
              <div>
                <h4>Entre de novo no seu WhatsApp</h4>
                <p>
                  Abra o aplicativo, toque em <b>Acessar conta novamente</b> e digite o código que chegar por SMS. Isso
                  tira o golpista da sua conta.
                </p>
                <Question title="Pediu uma senha que você não criou?">
                  <p>
                    O golpista criou uma senha na sua conta.{' '}
                    <b>Não precisa abrir chamado nem mandar e-mail: é só esperar.</b>
                  </p>
                  <ol className="question__list">
                    <li>
                      <b>1.</b>
                      <span>
                        Na tela da senha, toque em <b>Esqueceu a senha?</b> (ou <b>Esqueceu o PIN?</b>) e confirme.
                      </span>
                    </li>
                    <li>
                      <b>2.</b>
                      <span>
                        Espere <b>7 dias</b> com o WhatsApp instalado e o chip no celular. O golpista já está fora e não
                        consegue voltar.
                      </span>
                    </li>
                    <li>
                      <b>3.</b>
                      <span>
                        Depois, peça um <b>novo código por SMS</b> e entre. A conta é sua de novo.
                      </span>
                    </li>
                  </ol>
                </Question>
              </div>
            </li>
            <li>
              <span className="recovery__num" aria-hidden="true">
                3
              </span>
              <div>
                <h4>Registre o boletim de ocorrência</h4>
                <p>
                  Pela internet, na <b>Delegacia Eletrônica</b> do seu estado (
                  <a href={DELEGACIA_SP} target="_blank" rel="noopener noreferrer">
                    a de São Paulo fica aqui
                  </a>
                  ). Guarde prints da conversa e o número do golpista.
                </p>
              </div>
            </li>
            <li>
              <span className="recovery__num" aria-hidden="true">
                4
              </span>
              <div>
                <h4>Tranque a conta de volta</h4>
                <p>
                  Ative a <b>verificação em duas etapas</b> para isso não acontecer de novo.{' '}
                  <a href="#conta">O que é isso?</a>
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
