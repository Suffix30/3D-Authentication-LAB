# 3D Authentication LAB

A hands-on cybersecurity learning platform that teaches browser DevTools and web security fundamentals through 10 interactive 3D challenges.

Built for beginners, students, and educators. No prior security knowledge required.

![Three.js](https://img.shields.io/badge/Three.js-000?logo=threedotjs&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

Each level pairs a real-world security concept with a specific browser DevTools skill. Players progress from inspecting HTML elements to setting breakpoints and stepping through code, building practical debugging skills alongside security awareness.

An in-game walkthrough system provides three tiers of guidance per level:

1. **Concept explanation** in plain language
2. **Progressive hints** with step-by-step DevTools instructions
3. **Full solution** revealed only after all hints

## Quick Start

```bash
git clone https://github.com/Suffix30/3D-Authentication-LAB.git
cd 3D-Authentication-LAB
npm install
npm run dev
```

Open [http://localhost:3000/3D-Authentication-LAB/](http://localhost:3000/3D-Authentication-LAB/) in a Chromium-based browser for the best DevTools experience.

## Curriculum

| Level | Security Concept | DevTools Skill | Difficulty |
|:-----:|------------------|----------------|:----------:|
| 1 | Basic Authentication | Elements Tab | Easy |
| 2 | Two-Factor Authentication | Sources Tab | Medium |
| 3 | Pattern Recognition | Console Tab | Hard |
| 4 | Hidden Headers | Network Tab | Medium |
| 5 | SQL Injection Prevention | Console + Debugging | Hard |
| 6 | JWT Token Verification | Console + `atob()` | Expert |
| 7 | XSS Prevention | Elements + Live Editing | Hard |
| 8 | Steganography | Application Tab + Storage | Expert |
| 9 | Buffer Overflow Prevention | Debugger + Breakpoints | Expert |
| 10 | Zero-Knowledge Proof | Full DevTools Mastery | Master |

## How to Play

1. Read the hint displayed below the form
2. Use the **?** button in the bottom-right corner to open the walkthrough panel
3. Work through the progressive hints -- each one teaches you exactly where to click and what to look for in DevTools
4. Enter your answer in the form and click **Submit**
5. A green packet animation confirms a correct answer; red means try again

## Tech Stack

| Component | Technology |
|-----------|-----------|
| 3D Rendering | [Three.js](https://threejs.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Deployment | [gh-pages](https://www.npmjs.com/package/gh-pages) |

## Project Structure

```
├── index.html                  Entry point
├── vite.config.js              Vite configuration
├── package.json
└── src/
    ├── main.js                 Application logic, UI, help panel
    ├── index.css               Styles
    ├── levels/
    │   └── config.js           Level definitions, validation, walkthroughs
    └── components/
        └── LevelVisualizer.js  Three.js scene management per level
```

## Deployment

Build and deploy to GitHub Pages:

```bash
npm run build
npm run deploy
```

## Contributing

Contributions are welcome. To add a new level:

1. Add a level object to `src/levels/config.js` with `id`, `name`, `difficulty`, `requirements`, `hint`, `solution`, `validation`, `devtoolsSkill`, and `walkthrough`
2. Add a corresponding visualization method in `src/components/LevelVisualizer.js`
3. Register the new case in the `createVisualization` switch statement

---

## Hints

Each level includes a built-in walkthrough accessible via the **?** button. The walkthrough teaches you which DevTools tab to open, where to click, and what to look for -- without giving away the answer directly. Use DevTools to find the solutions yourself.

## License

See [LICENSE](LICENSE).
