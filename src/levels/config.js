export const levels = [
  {
    id: 1,
    name: "Basic Authentication",
    difficulty: "Easy",
    requirements: { email: true, password: true },
    hint: "Password must be at least 6 characters",
    solution: { email: "user@example.com", password: "secure123" },
    validation: (creds) => creds.email && creds.password.length >= 6,
    devtoolsSkill: "Elements Tab",
    walkthrough: {
      learn: "When you log into a website, it asks for an email and a password. The website checks if your password is strong enough. But here's the secret: you can use your browser's built-in tools to INSPECT any website and see how it works. These tools are called DevTools.",
      hints: [
        "Let's open DevTools for the first time! Right-click anywhere on this page and select \"Inspect\" (or press F12 on Windows / Cmd+Option+I on Mac). A panel will open on the side or bottom of your browser. This is DevTools -- every web developer uses it!",
        "You should see the \"Elements\" tab selected at the top of DevTools. This shows the HTML code that builds this page. Try clicking on different lines -- you'll see parts of the page highlight. Find the form in the middle of the screen by looking for <div id=\"form\"> in the Elements panel.",
        "Inside the form's HTML, you can see the input fields and the hint text. The hint says the password needs at least 6 characters. Now you know what to do: type any email and a password with 6+ characters. But the real lesson here is: you just learned to READ a website's structure using the Elements tab!"
      ],
      answer: "Email: anything (e.g. hello@test.com) | Password: any 6+ characters (e.g. secure123)"
    }
  },
  {
    id: 2,
    name: "Two-Factor Authentication",
    difficulty: "Medium",
    requirements: { email: true, password: true, code: true },
    hint: "Check page source for the OTP generator",
    solution: { email: "user@example.com", password: "secure123", code: "123456" },
    validation: (creds) => creds.email && creds.password.length >= 8 && creds.code === "123456",
    devtoolsSkill: "Sources Tab",
    walkthrough: {
      learn: "Two-factor authentication (2FA) adds a one-time code on top of your password. But where do you find that code? The hint says \"check page source.\" In DevTools, the Sources tab lets you see ALL the code files that make up a website -- including files with secrets that developers accidentally left in.",
      hints: [
        "Open DevTools (F12) and look at the tabs along the top. You've already used \"Elements.\" Now click on the \"Sources\" tab. This shows you every file the website loaded. On the left side, you'll see a file tree -- folders and files, just like on your computer.",
        "In the Sources file tree on the left, look for a folder called \"src\", then inside it find \"levels\", then click on \"config.js\". This file contains ALL the level data -- including the solutions! Scroll through it and find Level 2 (id: 2). Look at its \"solution\" object.",
        "You found it! The solution object shows code: \"123456\" -- that's the one-time passcode. Also notice the validation line: the password needs to be 8+ characters this time (not 6 like Level 1). The Sources tab is one of the most powerful DevTools features -- it lets you read any code a website sends to your browser."
      ],
      answer: "Email: anything | Password: any 8+ chars (e.g. secure123) | Code: 123456"
    }
  },
  {
    id: 3,
    name: "Pattern Recognition",
    difficulty: "Hard",
    requirements: { pattern: true },
    hint: "Follow the nodes in sequence",
    solution: { pattern: "1-4-2-3" },
    validation: (creds) => creds.pattern === "1-4-2-3",
    devtoolsSkill: "Console Tab",
    walkthrough: {
      learn: "Some security systems use patterns instead of passwords. But how do you figure out a hidden pattern? The Console tab in DevTools lets you RUN code directly in the browser. You can use it to inspect variables, call functions, and extract data that isn't visible on the page.",
      hints: [
        "Open DevTools (F12) and click the \"Console\" tab. This is like a command line for the browser -- you can type JavaScript code and it runs immediately. Try typing: document.title and press Enter. It shows you the page title! The Console can access anything on the page.",
        "The level data is stored in a JavaScript module. In the Console, you can't directly access module variables, but you already know where to find the answer from Level 2! Go back to the Sources tab, open src/levels/config.js, and find Level 3's solution object. But here's a Console trick to try: type document.getElementById('form').innerHTML and press Enter -- it shows you the form's HTML code.",
        "In the Sources tab, Level 3's solution shows pattern: \"1-4-2-3\". But let's also learn a Console trick: try typing document.querySelectorAll('input') and press Enter. It lists all input fields on the page. The Console is incredibly powerful for exploring what's on any web page."
      ],
      answer: "Pattern: 1-4-2-3 (dashes between each number)"
    }
  },
  {
    id: 4,
    name: "Hidden Header Challenge",
    difficulty: "Medium",
    requirements: { token: true },
    hint: "Check request headers",
    solution: { token: "X-Security-Token: h4ck3r" },
    validation: (creds) => creds.token === "h4ck3r",
    devtoolsSkill: "Network Tab",
    walkthrough: {
      learn: "When your browser loads a website, it sends and receives invisible messages called \"requests\" and \"responses.\" Each one carries \"headers\" -- hidden metadata like security tokens, cookies, and more. The Network tab in DevTools lets you see EVERY request your browser makes and inspect all the hidden headers.",
      hints: [
        "Open DevTools (F12) and click the \"Network\" tab. It might be empty -- that's because it only records activity AFTER you open it. Click the refresh button on your browser (or press F5) to reload the page. Now you'll see a list of files appear -- these are all the requests your browser made to load this page!",
        "Click on any request in the list (try clicking on the first one, which is the HTML page). A details panel opens on the right. Look for sections called \"Request Headers\" and \"Response Headers.\" These are the hidden headers! Every request has them. For this level, the token is in the level config -- go to Sources > src/levels/config.js > Level 4 and look at the solution.",
        "The solution shows \"X-Security-Token: h4ck3r\". In real hacking, you'd find tokens like this by inspecting the Network tab's headers. The header name is \"X-Security-Token\" and the value is \"h4ck3r\". The form only wants the VALUE part -- type just h4ck3r (without the header name)."
      ],
      answer: "Token: h4ck3r (just the value, not the header name)"
    }
  },
  {
    id: 5,
    name: "SQL Injection Prevention",
    difficulty: "Hard",
    requirements: { query: true },
    hint: "Escape special characters",
    solution: { query: "SELECT * FROM users WHERE id = '1' AND '1'='1'" },
    validation: (creds) => !creds.query.includes("--") && !creds.query.toLowerCase().includes("union"),
    devtoolsSkill: "Console + Debugging",
    walkthrough: {
      learn: "Websites store data in databases using a language called SQL. Hackers try to sneak dangerous commands into forms -- this is called \"SQL injection.\" For example, typing -- comments out security checks, and UNION steals data from other tables. This level teaches you to spot and avoid these dangerous patterns. You'll also learn to use the Console to TEST your input before submitting.",
      hints: [
        "Open DevTools (F12) and go to the Console tab. Let's test what the validator checks! Type this and press Enter: \"hello world\".includes(\"--\") -- it returns false, meaning \"hello world\" doesn't contain --. Now try: \"DROP TABLE--users\".includes(\"--\") -- it returns true! This is how you can test strings before submitting them.",
        "The validator blocks two patterns: \"--\" (SQL comment) and \"UNION\" (case-insensitive). Try testing in the Console: \"SELECT UNION\".toLowerCase().includes(\"union\") returns true -- blocked! But \"SELECT * FROM users\".includes(\"--\") returns false -- safe! Use the Console to experiment with different queries and see which ones would pass.",
        "Now go to Sources > src/levels/config.js > Level 5 and read the validation function yourself. It says: !creds.query.includes(\"--\") && !creds.query.toLowerCase().includes(\"union\"). Any text without those two patterns passes. Try: SELECT * FROM users WHERE id = 1"
      ],
      answer: "Query: SELECT * FROM users WHERE id = 1 (or any text without -- or UNION)"
    }
  },
  {
    id: 6,
    name: "JWT Token Verification",
    difficulty: "Expert",
    requirements: { jwt: true },
    hint: "Base64 decode the middle section",
    solution: { jwt: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWNrZXIifQ.secret" },
    validation: (creds) => creds.jwt.split('.').length === 3,
    devtoolsSkill: "Console + atob()",
    walkthrough: {
      learn: "A JWT (JSON Web Token) is a digital ID card with three parts separated by dots: header.payload.signature. The first two parts are encoded in Base64 -- a way of turning data into a text-safe format. You can DECODE them right in the Console using a built-in function called atob()!",
      hints: [
        "Look at the 3D scene -- three rings, one for each JWT part. Open DevTools (F12) > Console. Let's learn about Base64! Type this and press Enter: atob(\"aGVsbG8=\") -- it decodes to \"hello\"! The atob() function is built into every browser and decodes Base64 text. Hackers use this constantly to read encoded data.",
        "The hint says \"Base64 decode the middle section.\" Go to Sources > src/levels/config.js > Level 6 and find the JWT solution. It has three parts separated by dots. Copy the MIDDLE part (eyJzdWIiOiJoYWNrZXIifQ) and go back to the Console. Type: atob(\"eyJzdWIiOiJoYWNrZXIifQ\") and press Enter. You just decoded the payload!",
        "The decoded payload says {\"sub\":\"hacker\"} -- that's who the token belongs to! Now for the answer: the validator just checks that your input has exactly 3 dot-separated parts. Try testing in Console: \"a.b.c\".split(\".\").length returns 3 -- that would pass! But the intended answer is the full JWT from the source code."
      ],
      answer: "JWT: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWNrZXIifQ.secret (or any text with exactly 2 dots)"
    }
  },
  {
    id: 7,
    name: "XSS Prevention",
    difficulty: "Hard",
    requirements: { script: true },
    hint: "Sanitize HTML input",
    solution: { script: "&lt;script&gt;alert(1)&lt;/script&gt;" },
    validation: (creds) => !creds.script.includes("<script>"),
    devtoolsSkill: "Elements Tab + Live Editing",
    walkthrough: {
      learn: "XSS (Cross-Site Scripting) is when a hacker injects code like <script>alert('hacked')</script> into a website. Websites prevent this by \"sanitizing\" input -- replacing < with &lt; and > with &gt;. You'll now learn to use the Elements tab to EDIT a live web page, which is how security testers check for XSS vulnerabilities.",
      hints: [
        "Open DevTools (F12) > Elements tab. Find the form's hint text that says \"Sanitize HTML input.\" Right-click on that text in the Elements panel and select \"Edit as HTML.\" You can now TYPE HTML directly into the page! Try changing the hint text to <b>Hello!</b> and click outside -- the page updates live. This is how testers check if a site properly sanitizes input.",
        "Now try something dangerous (safely): in the Elements panel, edit any text and type <script>alert(1)</script>. Notice the browser does NOT run it when you edit via Elements -- that's because the Elements tab inserts text safely. But if a website's form accepted <script> tags without sanitizing them, the code WOULD run. That's XSS!",
        "The fix for XSS is to replace < with &lt; and > with &gt; -- these are called HTML entities. The browser shows them as text instead of treating them as code. Go to Console and try: \"&lt;script&gt;\".includes(\"<script>\") -- it returns false because &lt; is NOT the same as <. That's the answer: type the sanitized version."
      ],
      answer: "Script: &lt;script&gt;alert(1)&lt;/script&gt; (the escaped/sanitized version)"
    }
  },
  {
    id: 8,
    name: "Steganography",
    difficulty: "Expert",
    requirements: { hidden: true },
    hint: "Look at the RGB values",
    solution: { hidden: "LSB-SECRET" },
    validation: (creds) => creds.hidden === "LSB-SECRET",
    devtoolsSkill: "Application Tab + Storage",
    walkthrough: {
      learn: "Steganography hides secret messages inside normal-looking things like images. The most common method is LSB (Least Significant Bit) -- changing the tiniest part of each pixel's color. But websites also hide data in other places! The Application tab in DevTools lets you see hidden storage: cookies, localStorage, sessionStorage, and more. Security testers always check these for secrets.",
      hints: [
        "Open DevTools (F12) and click the \"Application\" tab (you might need to click >> to find it if your screen is small). On the left sidebar, you'll see sections like \"Local Storage\", \"Session Storage\", \"Cookies\", and \"Cache Storage.\" Click on each one and explore -- websites often store tokens, user data, and secrets here!",
        "The 3D scene shows a grid of green pixels -- this represents steganography (hiding data in images). The hint says \"Look at the RGB values\" and mentions LSB. LSB stands for \"Least Significant Bit\" -- it's the most famous steganography technique. In the Application tab, also try clicking \"Frames\" > \"top\" to see all resources the page loaded.",
        "For this level, the hidden message is in the source code. Go to Sources > src/levels/config.js > Level 8 and find the solution. The answer combines the technique name (LSB) with what it hides. But remember: you just learned the Application tab -- in real security testing, always check Local Storage and Cookies for hidden data!"
      ],
      answer: "Hidden: LSB-SECRET"
    }
  },
  {
    id: 9,
    name: "Buffer Overflow Prevention",
    difficulty: "Expert",
    requirements: { buffer: true },
    hint: "Check input length",
    solution: { buffer: "A".repeat(32) },
    validation: (creds) => creds.buffer.length <= 32,
    devtoolsSkill: "Debugger + Breakpoints",
    walkthrough: {
      learn: "A buffer overflow happens when input exceeds the space a program reserved for it -- like pouring 33 drops into a glass that holds 32. Hackers exploit this to crash programs or take control. Now you'll learn the most powerful DevTools skill: the DEBUGGER. It lets you pause code mid-execution and inspect every variable, step through code line by line, and understand exactly what a program is doing.",
      hints: [
        "Open DevTools (F12) > Sources tab. Find src/main.js and click on it to open the code. Look for the handleLogin function. Click on the line NUMBER (the gray number on the left) next to the line that says \"if (level.validation(credentials))\". A blue marker appears -- that's a BREAKPOINT! Now go fill in the Buffer field with some text and click Submit. The code PAUSES at your breakpoint!",
        "When the code is paused, look at the right side panel. You'll see a \"Scope\" section that shows all variables and their current values. Find \"credentials\" and expand it -- you can see exactly what you typed! Also find \"level\" and look at its validation function. In the Console (while paused), type: credentials.buffer.length to see your input's length. Press the blue play button (or F8) to resume.",
        "Now you know the validation checks that your input length is <= 32. In the Console, try: \"A\".repeat(32).length -- it returns 32, which fits! Try \"A\".repeat(33).length -- that's 33, which would overflow. Type anything with 32 or fewer characters. Remove your breakpoint by clicking the blue marker again."
      ],
      answer: "Buffer: any text with 32 or fewer characters (e.g. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA or just A)"
    }
  },
  {
    id: 10,
    name: "Zero-Knowledge Proof",
    difficulty: "Master",
    requirements: { proof: true, commitment: true },
    hint: "Hash must match without revealing the input",
    solution: { proof: "ZKP-HASH", commitment: "COMMITMENT-HASH" },
    validation: (creds) => creds.proof && creds.commitment && creds.proof !== creds.commitment,
    devtoolsSkill: "Full DevTools Mastery",
    walkthrough: {
      learn: "A zero-knowledge proof lets you prove you know a secret without revealing it. For this final level, you'll combine EVERYTHING you've learned: Elements to inspect the page, Sources to read code, Console to test values, Network to watch requests, Application to check storage, and the Debugger to step through logic. You're now a DevTools expert!",
      hints: [
        "This is the final challenge -- use all your DevTools skills! Start with the Sources tab: open src/levels/config.js and find Level 10. Read the validation function carefully. It checks three conditions. Can you figure out what they are just by reading the code? (Hint: look for &&, which means AND -- all conditions must be true.)",
        "The validation says: creds.proof && creds.commitment && creds.proof !== creds.commitment. Let's break that down in the Console. Type: Boolean(\"\") -- returns false (empty strings are \"falsy\"). Type: Boolean(\"hello\") -- returns true. Type: \"hello\" !== \"world\" -- returns true. So you need: both fields non-empty AND different from each other.",
        "Now set a breakpoint in handleLogin (like you learned in Level 9) to verify your answer before submitting. Fill in both fields with different values, let it pause, check the credentials in the Scope panel, then type level.validation(credentials) in the Console to test if it passes -- all without actually submitting! That's real debugging."
      ],
      answer: "Proof: ZKP-HASH | Commitment: COMMITMENT-HASH (or any two different non-empty values)"
    }
  }
];
