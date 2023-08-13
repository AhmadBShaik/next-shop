import { z } from "zod";

export const shopSignUpFormData = z
  .object({
    name: z.string().min(3),
    tagline: z.string().min(6),
    description: z.string().min(10),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must be same",
    path: ["confirmPassword"],
  });

export type ShopSignUpFormData = z.infer<typeof shopSignUpFormData>;
