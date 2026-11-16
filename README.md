<p align="center">
  <img src="docs/banner.png" alt="Código Seguro: before you reply, stop and check. An unknown number asks for the code that arrived by SMS, and Cadu, the padlock mascot, gets suspicious." width="100%">
</p>

<p align="center">
  A <b>website</b> and a <b>flyer</b> that teach older adults and their families<br>
  not to fall for the WhatsApp verification code scam.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-0E6B4B?labelColor=555" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-strict-1C2541?labelColor=555" alt="TypeScript strict">
  <img src="https://img.shields.io/badge/Vite-5-0E6B4B?labelColor=555" alt="Vite 5">
  <img src="https://img.shields.io/badge/accessible-A%2B%20and%20listen-B38800?labelColor=555" alt="Accessible: A+ and listen">
  <img src="https://img.shields.io/badge/data%20collected-none-A61E3A?labelColor=555" alt="Data collected: none">
</p>

> The website and the flyer are in Brazilian Portuguese, since they were made for a Brazilian audience.

## The scam

<img src="docs/golpe.png" alt="How the scam works: 1, someone calls pretending to be someone else. 2, they ask for the SMS code. 3, they take over your WhatsApp and ask your family for Pix transfers. The rule: the SMS code is yours alone. If someone asks for it, it's a scam, no matter who they are." width="100%">

## The website

Designed to be opened on a phone after receiving the flyer. Everything is written in plain language, with no technical jargon.

<img src="docs/vitrine.png" alt="Four phones showing the website: the opening screen, the scam simulator, the step-by-step guide to lock down WhatsApp, and what to do if you already shared the code." width="100%">

- **Simulator:** a scam conversation inside a phone. The user chooses how to reply and sees what happens.
- **Lock down your WhatsApp:** a step-by-step guide to two-step verification on Android and iPhone, with screenshots of the app.
- **Already hacked?** What to do right away, with a ready-to-send email for WhatsApp support.
- **Family:** how to talk to older relatives without scolding them.

## Built for older users

- **A+** enlarges the text across the whole site, and **Listen** reads the visible section aloud.
- Large buttons, high contrast, and a visible focus indicator for keyboard users.
- No data is collected: no sign-up, no forms, no tracking.

## Running the project

```bash
npm install
npm run dev     # opens the site at the address shown in the terminal
npm run build   # builds the production version into dist/
```

<details>
<summary><b>Folder structure</b></summary>

```
src/
├── components/   header, footer, flyer phone, icons, and buttons
├── sections/     one page section per file (opening, simulator, protection...)
├── hooks/        A+, read-aloud, and copy text
├── lib/          simulator script and visible-section reading
├── styles/       colors and styles, taken from the flyer
└── types/        shared types

public/panfleto/  front and back of the flyer
docs/             images for this README
```

</details>

## Authors

**[Mauro Junior](https://github.com/mj01px)**, **[Pablo de Souza](https://github.com/1pablex)**, and **[Victor Teixeira](https://github.com/VTNz19)**<br>
Software Engineering, 8B Evening · Universidade de Mogi das Cruzes · 2026
