import { z } from "zod";

export const shopSignInFormData = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export type ShopSignInFormData = z.infer<typeof shopSignInFormData>;
