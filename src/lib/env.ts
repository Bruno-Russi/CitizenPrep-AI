import { z } from "zod";

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  // AI / Speech
  OPENAI_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const missing = parsed.error.issues
    .map((i) => i.path.join("."))
    .join(", ");
  throw new Error(`Missing or invalid environment variables: ${missing}`);
}

export const env = parsed.data;
