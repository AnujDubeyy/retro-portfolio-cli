# ⚡ Retro Portfolio CLI

A **cyber-arcade style terminal portfolio** you can run instantly with `npx`.  
Built with Node.js — retro neon aesthetics, smooth animations, and interactive navigation.

![retro](https://img.shields.io/badge/aesthetic-retro-ff00ff?style=for-the-badge)
![node](https://img.shields.io/badge/node-%3E%3D18-00ffff?style=for-the-badge)
![license](https://img.shields.io/badge/license-MIT-39ff14?style=for-the-badge)

## 🚀 Quick Start

```bash
npx retro-portfolio
```

That's it. No install, no setup, no config.

## 🖥 What You Get

- **Boot animation** — scanline flicker + loading spinner
- **ASCII art banner** — your name in massive gradient text
- **Interactive menu** — arrow-key navigation across 5 sections
- **Projects gallery** — browse & open GitHub repos in your browser
- **Social links** — Instagram, X, LinkedIn, Discord, GitHub
- **Spotify playlists** — curated mood playlists, open with one click
- **About page** — bio, skills, interests, current project
- **Retro styling** — neon cyan/magenta/green/amber on dark backgrounds

## 🛠 Local Development

```bash
git clone https://github.com/yourusername/retro-portfolio-cli.git
cd retro-portfolio-cli
npm install
npm start
```

## ✏️ Customisation

Edit `src/data.js` to replace placeholder content with your own:

- `profile` — name, tagline, bio, skills, interests
- `projects` — GitHub repos with descriptions
- `socials` — social media links
- `playlists` — Spotify playlist URLs

## 📦 Publishing to npm

```bash
npm login
npm publish
```

Users can then run `npx retro-portfolio` to experience your portfolio.

## 📂 Project Structure

```
retro-portfolio-cli/
├── package.json      # npm manifest & bin entry
├── .gitignore
├── README.md
└── src/
    ├── cli.js        # entry point — boot, banner, menu loop
    ├── data.js       # placeholder portfolio data
    ├── screens.js    # section renderers (home, projects, etc.)
    └── ui.js         # colour helpers, dividers, animations
```

## License

MIT
