<div align="center">

# 🔥 FenixUz

**Fast, Secure & Modern Messenger**

[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-green.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)
![Status](https://img.shields.io/badge/Status-In_Development-yellow)
![Languages](https://img.shields.io/badge/Languages-EN%20|%20RU%20|%20UZ-blue)

</div>

---

## 📖 About

FenixUz is a messenger built on the Telegram API with unique privacy and productivity features. This repository contains the landing page for the application.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔒 **Secret Chats** | Hide conversations with an extra layer of protection |
| 🔂 **One-Time Playback** | Media can only be viewed once |
| 📲 **Deleted Messages Recovery** | Three recovery modes for deleted messages |
| 👻 **Ghost Mode & Proxy** | Quick access to proxy and stealth features |
| ✍️ **Auto-Text** | Automatic text templates per chat |
| 👤 **Contact Detection** | See who saved you in their contacts |

## 🛠 Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript** — ES Modules, IntersectionObserver, i18n
- **No frameworks** — Pure vanilla, zero dependencies

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/<username>/fenixuz.git
cd fenixuz

# Start local server
cd frontend
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## 📁 Project Structure

```
frontend/
├── index.html           # Homepage
├── privacy.html         # Privacy Policy
├── terms.html           # Terms of Service
├── css/
│   ├── variables.css    # Design tokens
│   ├── reset.css        # CSS reset
│   ├── base.css         # Base styles
│   ├── layout.css       # Grid & containers
│   ├── components.css   # Buttons, cards, nav
│   ├── animations.css   # Scroll animations
│   ├── home.css         # Homepage styles
│   └── legal.css        # Legal pages styles
├── js/
│   ├── main.js          # Entry point
│   └── components/
│       ├── header.js    # Mobile menu, scroll effects
│       ├── animations.js # IntersectionObserver
│       └── i18n.js      # Language switcher
├── i18n/
│   ├── en.json          # 🇬🇧 English
│   ├── ru.json          # 🇷🇺 Russian
│   └── uz.json          # 🇺🇿 Uzbek
└── images/              # Logos & assets
```

## 🌐 Deployment

Static site — no build step required. Deploy `frontend/` folder to:

| Platform | Command |
|----------|---------|
| **Netlify** | Drag & drop `frontend/` folder |
| **Vercel** | `npx -y vercel ./frontend` |
| **GitHub Pages** | Settings → Pages → Source: `main`, folder: `/frontend` |

## 📬 Contact

- **Email:** support@fenixuz.com

## 📄 License

This project is licensed under the [GNU General Public License v2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html).

---

<div align="center">
  <sub>Built with ❤️ in Uzbekistan</sub>
</div>
