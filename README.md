# 3D Authentication LAB

An immersive 3D cybersecurity learning platform built with Three.js. Learn real-world security concepts AND browser DevTools skills by solving 10 hands-on challenges, each with its own 3D visualization and guided walkthrough.

Designed for kids, students, and anyone curious about how security and web development work.

## Technologies

- Three.js
- Vite

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000/3D-Authentication-LAB/` in your browser.

## How to Play

1. Each level presents a security challenge with a 3D scene and a form
2. Read the hint below the form -- it tells you what the level is about
3. Click the **? Help** button (bottom-right) for a guided walkthrough:
   - **DevTools Skill badge** -- tells you which DevTools feature this level teaches
   - **What is this?** -- explains the security concept in plain language
   - **Next Hint** -- reveals step-by-step hints that teach you exactly where to click and what to look for in DevTools
   - **Show Answer** -- only appears after all hints, gives you the final answer
4. Fill in the form and click Submit
5. Green packet flying in = correct! Red packet = try again

## DevTools Skills Progression

Each level teaches a specific browser DevTools skill, building from beginner to expert:

| Level | Security Concept | DevTools Skill You'll Learn |
|-------|-----------------|---------------------------|
| 1 | Basic Authentication | **Elements Tab** -- Inspect page structure and read HTML |
| 2 | Two-Factor Auth | **Sources Tab** -- Browse and read a website's code files |
| 3 | Pattern Recognition | **Console Tab** -- Run JavaScript commands in the browser |
| 4 | Hidden Headers | **Network Tab** -- Watch requests and inspect hidden headers |
| 5 | SQL Injection | **Console + Debugging** -- Test strings and logic in real time |
| 6 | JWT Tokens | **Console + atob()** -- Decode Base64 data in the browser |
| 7 | XSS Prevention | **Elements + Live Editing** -- Edit a live web page to test vulnerabilities |
| 8 | Steganography | **Application Tab** -- Explore cookies, storage, and cached data |
| 9 | Buffer Overflow | **Debugger + Breakpoints** -- Pause code and inspect variables mid-execution |
| 10 | Zero-Knowledge Proof | **Full DevTools Mastery** -- Combine all skills to analyze and debug |

---

## Walkthrough

> Each level has three tiers: **Learn** (what the concept is), **Hints** (step-by-step DevTools instructions), and **Answer** (the solution). Try the hints first!

---

### Level 1: Basic Authentication (Easy)
**DevTools Skill: Elements Tab**

**Learn:** Websites check your email and password when you log in. But you can use DevTools to inspect any website and see how it works.

**How to solve it:**
1. Right-click anywhere on the page and select "Inspect" (or press F12). This opens DevTools. You'll see the "Elements" tab showing the page's HTML code
2. Click on different HTML lines -- parts of the page highlight. Find `<div id="form">` to see the form's structure and the hint text
3. The hint says password needs 6+ characters. Type any email and a 6+ character password

**Answer:** Email: `hello@test.com` | Password: `secure123`

---

### Level 2: Two-Factor Authentication (Medium)
**DevTools Skill: Sources Tab**

**Learn:** 2FA adds a one-time code on top of your password. The Sources tab lets you see ALL code files a website loaded -- including secrets developers left in.

**How to solve it:**
1. Open DevTools (F12) > click the "Sources" tab. You'll see a file tree on the left with all the website's files
2. Navigate to `src` > `levels` > `config.js`. This file has all level data including solutions. Find Level 2's solution object
3. The solution shows `code: "123456"`. Password needs 8+ characters this time

**Answer:** Email: `anything` | Password: `secure123` (8+ chars) | Code: `123456`

---

### Level 3: Pattern Recognition (Hard)
**DevTools Skill: Console Tab**

**Learn:** The Console lets you run JavaScript commands directly in the browser. You can inspect variables, test code, and extract hidden data.

**How to solve it:**
1. Open DevTools (F12) > Console tab. Type `document.title` and press Enter -- it shows the page title. Try `document.querySelectorAll('input')` to list all form fields
2. The pattern is in the source code. Go to Sources > `src/levels/config.js` > Level 3's solution
3. Test in Console: `document.getElementById('form').innerHTML` shows the form's HTML

**Answer:** Pattern: `1-4-2-3`

---

### Level 4: Hidden Header Challenge (Medium)
**DevTools Skill: Network Tab**

**Learn:** The Network tab shows every request your browser makes and all the hidden headers attached to each one.

**How to solve it:**
1. Open DevTools (F12) > Network tab. Refresh the page (F5) to see all requests appear in the list
2. Click any request to see its details. Look for "Request Headers" and "Response Headers" sections -- these carry hidden data
3. The token is in Sources > `src/levels/config.js` > Level 4. The solution shows `X-Security-Token: h4ck3r`. Enter only the value part

**Answer:** Token: `h4ck3r`

---

### Level 5: SQL Injection Prevention (Hard)
**DevTools Skill: Console + Debugging**

**Learn:** SQL injection sneaks dangerous commands into forms. Use the Console to test which strings are safe before submitting.

**How to solve it:**
1. In the Console, test: `"hello world".includes("--")` returns false (safe). `"DROP--users".includes("--")` returns true (blocked)
2. The validator blocks `--` and `UNION`. Test: `"SELECT UNION".toLowerCase().includes("union")` returns true (blocked)
3. Read the validation in Sources > `config.js` > Level 5. Any text without `--` or `UNION` passes

**Answer:** Query: `SELECT * FROM users WHERE id = 1` (or any text without `--` or `UNION`)

---

### Level 6: JWT Token Verification (Expert)
**DevTools Skill: Console + atob()**

**Learn:** JWTs have three Base64-encoded parts separated by dots. The `atob()` function decodes Base64 right in the Console.

**How to solve it:**
1. In Console, try: `atob("aGVsbG8=")` -- it decodes to "hello". `atob()` is built into every browser
2. Find the JWT in Sources > `config.js` > Level 6. Copy the middle part and decode it: `atob("eyJzdWIiOiJoYWNrZXIifQ")` reveals `{"sub":"hacker"}`
3. Test the validator: `"a.b.c".split(".").length` returns 3 -- that would pass. The input needs exactly 3 dot-separated parts

**Answer:** JWT: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWNrZXIifQ.secret` (or `a.b.c`)

---

### Level 7: XSS Prevention (Hard)
**DevTools Skill: Elements Tab + Live Editing**

**Learn:** XSS injects malicious scripts into websites. The Elements tab lets you edit a live page to test for vulnerabilities.

**How to solve it:**
1. In Elements tab, right-click any text > "Edit as HTML." Try changing text to `<b>Hello!</b>` -- the page updates live. This is how testers check for XSS
2. HTML entities: `<` becomes `&lt;` and `>` becomes `&gt;`. The browser shows them as text instead of running them as code
3. Test in Console: `"&lt;script&gt;".includes("<script>")` returns false -- the escaped version is safe

**Answer:** Script: `&lt;script&gt;alert(1)&lt;/script&gt;`

---

### Level 8: Steganography (Expert)
**DevTools Skill: Application Tab + Storage**

**Learn:** Websites hide data in storage (cookies, localStorage, sessionStorage). The Application tab reveals it all.

**How to solve it:**
1. Open DevTools (F12) > Application tab (click >> if you don't see it). Explore "Local Storage", "Session Storage", "Cookies" on the left sidebar
2. The 3D scene shows green pixels representing LSB (Least Significant Bit) steganography -- hiding data in pixel colors
3. Find the answer in Sources > `config.js` > Level 8. The hidden message combines the technique name with what it contains

**Answer:** Hidden: `LSB-SECRET`

---

### Level 9: Buffer Overflow Prevention (Expert)
**DevTools Skill: Debugger + Breakpoints**

**Learn:** The Debugger lets you pause code mid-execution and inspect every variable. This is the most powerful DevTools skill.

**How to solve it:**
1. In Sources tab, open `src/main.js`. Find the `handleLogin` function. Click the line NUMBER next to `if (level.validation(credentials))` -- a blue breakpoint marker appears. Now fill in the form and click Submit -- the code PAUSES
2. While paused, look at the "Scope" panel on the right. Expand "credentials" to see your input. In Console (while paused), type `credentials.buffer.length` to check your input's length
3. Test: `"A".repeat(32).length` returns 32 (fits). `"A".repeat(33).length` returns 33 (overflow). Enter 32 or fewer characters. Click the blue marker again to remove the breakpoint

**Answer:** Buffer: `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` (32 A's, or any text 32 chars or fewer)

---

### Level 10: Zero-Knowledge Proof (Master)
**DevTools Skill: Full DevTools Mastery**

**Learn:** Combine everything: Elements, Sources, Console, Network, Application, and Debugger to analyze and solve the final challenge.

**How to solve it:**
1. Sources tab: open `config.js` > Level 10. Read the validation: `creds.proof && creds.commitment && creds.proof !== creds.commitment`. Three conditions joined by `&&` (AND)
2. Console: test `Boolean("")` (false), `Boolean("hello")` (true), `"hello" !== "world"` (true). Both fields must be non-empty and different
3. Set a breakpoint in `handleLogin`, fill in both fields, let it pause, then type `level.validation(credentials)` in Console to verify before resuming

**Answer:** Proof: `ZKP-HASH` | Commitment: `COMMITMENT-HASH` (or any two different non-empty values)

---

## Deploy

```bash
npm run build
npm run deploy
```

## License

See [LICENSE](LICENSE).
