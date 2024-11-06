export interface Level {
  id: number;
  name: string;
  difficulty: string;
  requirements: Record<string, boolean>;
  hint: string;
  validation: (credentials: any) => boolean;
}

export const levels: Level[] = [
  {
    id: 1,
    name: "Basic Authentication",
    difficulty: "Easy",
    requirements: { email: true, password: true },
    hint: "Password must be at least 6 characters",
    validation: (creds) => creds.email && creds.password.length >= 6
  },
  {
    id: 2,
    name: "Two-Factor Authentication",
    difficulty: "Medium",
    requirements: { email: true, password: true, code: true },
    hint: "Check page source for the OTP generator",
    validation: (creds) => creds.email && creds.password.length >= 8 && creds.code === "123456"
  },
];