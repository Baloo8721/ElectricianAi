# ElectricianAi

A simple, mobile-first training site for electrician apprentices. All topics are open — no levels, scores, or ads.

**Live site:** [https://baloo8721.github.io/ElectricianAi/](https://baloo8721.github.io/ElectricianAi/)

## Features

- 6-digit PIN gate (re-enter every visit — nothing stored in the browser)
- 13 topics: safety, power flow, multimeter, conduit, NEC, interview prep, and more
- Reference posters and diagrams (zoom on tap)
- Search across all lesson cards

## Security note

GitHub Pages is **static hosting**. The PIN keeps casual visitors out of the UI, but lesson files and images are still in the published site. A determined person could inspect or brute-force the client-side hash. Use this for **casual privacy**, not high-security secrets.

## Local development

1. Copy `.env.example` to `.env` and set a 6-digit `APP_PIN`.
2. Build config: `npm run build` (creates `js/pin-hash.js` — do not commit this file)
3. Preview: `npm run preview` → open http://localhost:3000

## Deploy (GitHub Actions)

1. Push to `main` on [Baloo8721/ElectricianAi](https://github.com/Baloo8721/ElectricianAi).
2. Repo **Settings → Secrets and variables → Actions** → add `APP_PIN` (your 6-digit code).
3. **Settings → Pages** → Source: **GitHub Actions** (not “Deploy from branch”).
4. Each push to `main` runs the workflow and publishes the site.

## Source content

- `info1.md` – `info4.md`: original reference notes
- `content/lessons.json`: structured lessons used by the app
- `assets/`: diagrams and posters

## License

Private training material — use and deploy as you own the content.
