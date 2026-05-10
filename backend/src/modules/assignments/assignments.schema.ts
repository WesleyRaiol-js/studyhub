import { z } from "zod";

export const createAssignmentSchema = z.object({
  subjectId: z.uuid("Invalid subject id"),

  title: z
    .string()
    .min(2, "Title must have at least 2 characters")
    .max(180, "Title must have at most 180 characters"),

  description: z
    .string()
    .optional()
    .or(z.literal("")),

  dueDate: z.iso.datetime("Invalid due date"),

  priority: z.enum(["low", "medium", "high"]),

  status: z.enum(["pending", "in_progress", "completed", "overdue"]),
});

export const updateAssignmentSchema = createAssignmentSchema.partial();

export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;
export type UpdateAssignmentInput = z.infer<typeof updateAssignmentSchema>;
