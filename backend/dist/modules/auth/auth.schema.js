"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Name must have at least 3 characters")
        .max(120, "Name must have at most 120 characters"),
    email: zod_1.z.email("Invalid e-mail format").max(255),
    password: zod_1.z
        .string()
        .min(6, "Password must have at least 6 characters")
        .max(100, "Password must have at most 100 characters"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid e-mail format").max(255),
    password: zod_1.z.string().min(6, "Password must have at least 6 characters"),
});
