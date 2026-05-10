"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubjectSchema = exports.createSubjectSchema = void 0;
const zod_1 = require("zod");
exports.createSubjectSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must have at least 2 characters")
        .max(150, "Name must have at most 150 characters"),
    code: zod_1.z
        .string()
        .max(50, "Code must have at most 50 characters")
        .optional()
        .or(zod_1.z.literal("")),
    professor: zod_1.z
        .string()
        .max(120, "Professor must have at most 120 characters")
        .optional()
        .or(zod_1.z.literal("")),
    semester: zod_1.z
        .string()
        .min(2, "Semester is required")
        .max(30, "Semester must have at most 30 characters"),
    color: zod_1.z
        .string()
        .max(20, "Color must have at most 20 characters")
        .optional()
        .or(zod_1.z.literal("")),
});
exports.updateSubjectSchema = exports.createSubjectSchema.partial();
