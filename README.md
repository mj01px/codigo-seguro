<p align="center">
  <img src="docs/banner.png" alt="Código Seguro: nunca passe o código do seu WhatsApp! Ilustração de um golpista pedindo o código por telefone enquanto o SMS chega no celular." width="100%">
</p>

<p align="center">
  Um <b>site</b> e um <b>panfleto</b> para ensinar pessoas mais velhas e suas famílias<br>
  a não cair no golpe do código do WhatsApp.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-0E6B4B?labelColor=555" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-strict-1C2541?labelColor=555" alt="TypeScript strict">
  <img src="https://img.shields.io/badge/Vite-5-0E6B4B?labelColor=555" alt="Vite 5">
  <img src="https://img.shields.io/badge/acess%C3%ADvel-A%2B%20e%20ouvir-B38800?labelColor=555" alt="Acessível: A+ e ouvir">
  <img src="https://img.shields.io/badge/dados%20coletados-nenhum-A61E3A?labelColor=555" alt="Dados coletados: nenhum">
</p>

## O golpe

<img src="docs/golpe.png" alt="Como o golpe acontece: 1, ligam fingindo ser alguém de loja, banco, entrega ou pesquisa. 2, pedem o código do SMS. 3, pedem Pix no seu nome para a sua família. Regra de ouro: nenhuma empresa precisa do código do seu WhatsApp, quem pede é golpista." width="100%">

## O site

Feito para ser aberto no celular, depois de receber o panfleto. Tudo em português simples, sem termo técnico.

<img src="docs/vitrine.png" alt="Quatro celulares mostrando o site: a abertura, o teste do golpe, o passo a passo para trancar o WhatsApp e o que fazer se já roubaram a conta." width="100%">

- **Simulador:** uma conversa de golpe dentro de um celular. A pessoa escolhe o que responder e vê o que acontece.
- **Tranque seu WhatsApp:** o passo a passo da verificação em duas etapas no Android e no iPhone, com as telas do app.
- **Já roubaram?** O que fazer na hora, com o e-mail pronto para o suporte do WhatsApp.
- **Família:** como conversar com os mais velhos sem dar bronca.

## Pensado para quem tem mais idade

- **A+** aumenta o texto do site inteiro, e **Ouvir** lê em voz alta a parte que está na tela.
- Botões grandes, contraste alto e foco visível para quem usa o teclado.
- Nenhum dado é coletado: sem cadastro, sem formulário, sem rastreamento.

## Rodando o projeto

```bash
npm install
npm run dev     # abre o site no endereço que aparecer no terminal
npm run build   # gera a versão final em dist/
```

<details>
<summary><b>Estrutura das pastas</b></summary>

```
src/
├── components/   cabeçalho, rodapé, celular do panfleto, ícones e botões
├── sections/     uma parte da página por arquivo (abertura, simulador, proteção...)
├── hooks/        A+, leitura em voz alta e copiar texto
├── lib/          roteiro do simulador e leitura da seção visível
├── styles/       cores e estilos, tirados do panfleto
└── types/        tipos compartilhados

public/panfleto/  frente e verso do panfleto
docs/             imagens deste README
```

</details>

## Quem fez

**[Mauro Junior](https://github.com/mj01px)**, **[Pablo de Souza](https://github.com/1pablex)**, **Matheus Henrique** e **Victor Teixeira**<br>
Engenharia de Software, 8B Noturno · Universidade de Mogi das Cruzes · 2026
