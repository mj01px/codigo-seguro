const AUTHORS = ['Mauro Junior', 'Pablo de Souza', 'Victor Teixeira'];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div>
            <p className="footer__wordmark">Código Seguro</p>
            <p className="footer__tagline">Antes de responder, pare e confirme.</p>
          </div>
          <span className="footer__badge">Projeto de extensão</span>
        </div>

        <div className="footer__grid">
          <div>
            <p className="footer__label">O projeto</p>
            <p>
              Um projeto de extensão da <b>Universidade de Mogi das Cruzes (UMC)</b>, feito por alunos para ajudar a
              sociedade a se proteger do golpe do código do WhatsApp.
            </p>
          </div>
          <div>
            <p className="footer__label">Curso</p>
            <p>
              Engenharia de Software
              <br />
              8B Noturno · 2026
            </p>
          </div>
          <div>
            <p className="footer__label">Quem fez</p>
            <ul className="footer__names">
              {AUTHORS.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer__bottom">Este site não coleta nenhum dado seu.</p>
      </div>
    </footer>
  );
}
