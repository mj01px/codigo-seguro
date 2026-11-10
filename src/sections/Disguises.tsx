const DISGUISES = [
  {
    title: 'Loja ou promoção',
    quote: '“Você ganhou um brinde! Só preciso do código que chegou aí.”',
    action: 'desligue. Loja nenhuma precisa do código.',
  },
  {
    title: 'Entrega ou pesquisa',
    quote: '“É da transportadora. Para liberar sua encomenda, me confirma o código.”',
    action: 'entrega não precisa de código do WhatsApp.',
  },
  {
    title: 'Anúncio de venda',
    quote: '“Vi seu anúncio do sofá. O site pede que você me passe o código.”',
    action: 'converse só pelo chat do site de anúncios.',
  },
  {
    title: 'Falso suporte do WhatsApp',
    quote: '“Sua conta vai ser bloqueada. Envie o código para mantê-la ativa.”',
    action: 'o WhatsApp nunca pede o código.',
  },
  {
    title: 'Amigo “por engano”',
    quote: '“Mandei um código pro seu número sem querer, me passa?”',
    action: 'ligue para a pessoa. A conta dela já foi roubada.',
  },
  {
    title: 'Vacina ou benefício',
    quote: '“É da Secretaria de Saúde. Confirme o código da sua vacina.”',
    action: 'saúde e governo não pedem código.',
  },
];

export function Disguises() {
  return (
    <section id="disfarces" className="part part--disfarces" aria-labelledby="disfarces-title" data-readable>
      <div className="container">
        <p className="kicker kicker--center">sempre o mesmo golpe, com outra desculpa:</p>
        <h2 id="disfarces-title" className="h2 h2--center">
          Os 6 disfarces de quem pede o código
        </h2>
        <div className="disguises">
          {DISGUISES.map((item, index) => (
            <article key={item.title} className={`disguise${index === 0 ? ' disguise--featured' : ''}`}>
              <p className="disguise__eyebrow">DISFARCE {index + 1}</p>
              <h3 className="disguise__title">{item.title}</h3>
              <p className="disguise__quote">{item.quote}</p>
              <p className="disguise__action">
                <b>Faça:</b> {item.action}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
