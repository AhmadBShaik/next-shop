import { z } from "zod";

export const userSignInFormData = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export type UserSignInFormData = z.infer<typeof userSignInFormData>;
