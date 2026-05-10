import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z
    .string()
    .min(2, "Name must have at least 2 characters")
    .max(150, "Name must have at most 150 characters"),

  code: z
    .string()
    .max(50, "Code must have at most 50 characters")
    .optional()
    .or(z.literal("")),

  professor: z
    .string()
    .max(120, "Professor must have at most 120 characters")
    .optional()
    .or(z.literal("")),

  semester: z
    .string()
    .min(2, "Semester is required")
    .max(30, "Semester must have at most 30 characters"),

  color: z
    .string()
    .max(20, "Color must have at most 20 characters")
    .optional()
    .or(z.literal("")),
});

export const updateSubjectSchema = createSubjectSchema.partial();

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>;
