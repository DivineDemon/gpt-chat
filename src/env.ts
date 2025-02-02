import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    OPENAI_KEY: z.string().regex(/^sk-[a-zA-Z0-9]{48}$/, {
      message: "Invalid OpenAI API key format.",
    }),
    IMGBB_KEY: z.string(),
    SERPER_KEY: z.string(),
    KINDE_SITE_URL: z.string().url(),
    KINDE_ISSUER_URL: z.string().url(),
    KINDE_CLIENT_ID: z.string().min(1),
    KINDE_CLIENT_SECRET: z.string().min(1),
    KINDE_POST_LOGIN_REDIRECT_URL: z.string().url(),
    KINDE_POST_LOGOUT_REDIRECT_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_KINDE_EMAIL_CONNECTION_ID: z.string().min(1),
    NEXT_PUBLIC_KINDE_GITHUB_CONNECTION_ID: z.string().min(1),
    NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    IMGBB_KEY: process.env.IMGBB_KEY,
    OPENAI_KEY: process.env.OPENAI_KEY,
    SERPER_KEY: process.env.SERPER_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    KINDE_SITE_URL: process.env.KINDE_SITE_URL,
    KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
    KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
    KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
    KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
    KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
    NEXT_PUBLIC_KINDE_EMAIL_CONNECTION_ID:
      process.env.NEXT_PUBLIC_KINDE_EMAIL_CONNECTION_ID,
    NEXT_PUBLIC_KINDE_GITHUB_CONNECTION_ID:
      process.env.NEXT_PUBLIC_KINDE_GITHUB_CONNECTION_ID,
    NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID:
      process.env.NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
