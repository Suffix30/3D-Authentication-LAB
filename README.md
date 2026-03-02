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

## Walkthrough (Spoilers)

<details>
<summary>Level 1 -- Basic Authentication</summary>

**DevTools Skill:** Elements Tab

Open DevTools with F12 and select the Elements tab. Inspect the page structure to find the form and read the hint. The password must be at least 6 characters.

**Answer:** Email: `hello@test.com` | Password: `secure123`
</details>

<details>
<summary>Level 2 -- Two-Factor Authentication</summary>

**DevTools Skill:** Sources Tab

Open DevTools > Sources tab. Navigate the file tree to `src/levels/config.js` and locate Level 2's solution object. The password requirement increases to 8 characters.

**Answer:** Email: `anything` | Password: `secure123` | Code: `123456`
</details>

<details>
<summary>Level 3 -- Pattern Recognition</summary>

**DevTools Skill:** Console Tab

Open DevTools > Console tab. Practice running commands like `document.title` and `document.querySelectorAll('input')`. Find the pattern in the Sources tab under Level 3's solution.

**Answer:** Pattern: `1-4-2-3`
</details>

<details>
<summary>Level 4 -- Hidden Header Challenge</summary>

**DevTools Skill:** Network Tab

Open DevTools > Network tab and refresh the page to capture requests. Click any request to inspect its headers. The token value is in the level config under Level 4's solution.

**Answer:** Token: `h4ck3r`
</details>

<details>
<summary>Level 5 -- SQL Injection Prevention</summary>

**DevTools Skill:** Console + Debugging

Use the Console to test string methods: `"test".includes("--")` and `"test".toLowerCase().includes("union")`. The validator rejects any input containing `--` or `UNION`.

**Answer:** Query: `SELECT * FROM users WHERE id = 1`
</details>

<details>
<summary>Level 6 -- JWT Token Verification</summary>

**DevTools Skill:** Console + `atob()`

Use `atob()` in the Console to decode Base64 strings. A JWT has three dot-separated parts. The validator checks that `input.split('.').length === 3`.

**Answer:** JWT: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWNrZXIifQ.secret`
</details>

<details>
<summary>Level 7 -- XSS Prevention</summary>

**DevTools Skill:** Elements Tab + Live Editing

Right-click any element in the Elements tab and select "Edit as HTML" to practice live editing. The validator rejects input containing literal `<script>`. Submit the HTML-escaped version.

**Answer:** Script: `&lt;script&gt;alert(1)&lt;/script&gt;`
</details>

<details>
<summary>Level 8 -- Steganography</summary>

**DevTools Skill:** Application Tab + Storage

Open DevTools > Application tab to explore Local Storage, Session Storage, and Cookies. The 3D scene represents LSB (Least Significant Bit) steganography. The answer is in the level config.

**Answer:** Hidden: `LSB-SECRET`
</details>

<details>
<summary>Level 9 -- Buffer Overflow Prevention</summary>

**DevTools Skill:** Debugger + Breakpoints

In the Sources tab, open `src/main.js` and set a breakpoint on the validation line inside `handleLogin`. Submit the form to pause execution, then inspect variables in the Scope panel. The buffer limit is 32 characters.

**Answer:** Buffer: `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` (32 characters or fewer)
</details>

<details>
<summary>Level 10 -- Zero-Knowledge Proof</summary>

**DevTools Skill:** Full DevTools Mastery

Combine all skills: read the validation logic in Sources, test conditions in Console, and verify with breakpoints. Both fields must be non-empty and different from each other.

**Answer:** Proof: `ZKP-HASH` | Commitment: `COMMITMENT-HASH`
</details>

## License

See [LICENSE](LICENSE).
