export const levels = [
  {
    id: 1,
    name: "Basic Authentication",
    difficulty: "Easy",
    requirements: { email: true, password: true },
    hint: "Password must be at least 6 characters",
    solution: { email: "user@example.com", password: "secure123" },
    validation: (creds) => creds.email && creds.password.length >= 6
  },
  {
    id: 2,
    name: "Two-Factor Authentication",
    difficulty: "Medium",
    requirements: { email: true, password: true, code: true },
    hint: "Check page source for the OTP generator",
    solution: { email: "user@example.com", password: "secure123", code: "123456" },
    validation: (creds) => creds.email && creds.password.length >= 8 && creds.code === "123456"
  },
  {
    id: 3,
    name: "Pattern Recognition",
    difficulty: "Hard",
    requirements: { pattern: true },
    hint: "Follow the nodes in sequence",
    solution: { pattern: "1-4-2-3" },
    validation: (creds) => creds.pattern === "1-4-2-3"
  },
  {
    id: 4,
    name: "Hidden Header Challenge",
    difficulty: "Medium",
    requirements: { token: true },
    hint: "Check request headers",
    solution: { token: "X-Security-Token: h4ck3r" },
    validation: (creds) => creds.token === "h4ck3r"
  },
  {
    id: 5,
    name: "SQL Injection Prevention",
    difficulty: "Hard",
    requirements: { query: true },
    hint: "Escape special characters",
    solution: { query: "SELECT * FROM users WHERE id = '1' AND '1'='1'" },
    validation: (creds) => !creds.query.includes("--") && !creds.query.toLowerCase().includes("union")
  },
  {
    id: 6,
    name: "JWT Token Verification",
    difficulty: "Expert",
    requirements: { jwt: true },
    hint: "Base64 decode the middle section",
    solution: { jwt: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWNrZXIifQ.secret" },
    validation: (creds) => creds.jwt.split('.').length === 3
  },
  {
    id: 7,
    name: "XSS Prevention",
    difficulty: "Hard",
    requirements: { script: true },
    hint: "Sanitize HTML input",
    solution: { script: "&lt;script&gt;alert(1)&lt;/script&gt;" },
    validation: (creds) => !creds.script.includes("<script>")
  },
  {
    id: 8,
    name: "Steganography",
    difficulty: "Expert",
    requirements: { hidden: true },
    hint: "Look at the RGB values",
    solution: { hidden: "LSB-SECRET" },
    validation: (creds) => creds.hidden === "LSB-SECRET"
  },
  {
    id: 9,
    name: "Buffer Overflow Prevention",
    difficulty: "Expert",
    requirements: { buffer: true },
    hint: "Check input length",
    solution: { buffer: "A".repeat(32) },
    validation: (creds) => creds.buffer.length <= 32
  },
  {
    id: 10,
    name: "Zero-Knowledge Proof",
    difficulty: "Master",
    requirements: { proof: true, commitment: true },
    hint: "Hash must match without revealing the input",
    solution: { proof: "ZKP-HASH", commitment: "COMMITMENT-HASH" },
    validation: (creds) => creds.proof && creds.commitment && creds.proof !== creds.commitment
  }
];