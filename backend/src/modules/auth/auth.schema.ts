import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(120, "Name must have at most 120 characters"),

  email: z.email("Invalid e-mail format").max(255),

  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password must have at most 100 characters"),
});

export const loginSchema = z.object({
  email: z.email("Invalid e-mail format").max(255),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
