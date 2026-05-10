"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssignmentSchema = exports.createAssignmentSchema = void 0;
const zod_1 = require("zod");
exports.createAssignmentSchema = zod_1.z.object({
    subjectId: zod_1.z.uuid("Invalid subject id"),
    title: zod_1.z
        .string()
        .min(2, "Title must have at least 2 characters")
        .max(180, "Title must have at most 180 characters"),
    description: zod_1.z
        .string()
        .optional()
        .or(zod_1.z.literal("")),
    dueDate: zod_1.z.iso.datetime("Invalid due date"),
    priority: zod_1.z.enum(["low", "medium", "high"]),
    status: zod_1.z.enum(["pending", "in_progress", "completed", "overdue"]),
});
exports.updateAssignmentSchema = exports.createAssignmentSchema.partial();
