"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../lib/prisma");
const jwtSecret = process.env.JWT_SECRET || "default_secret";
class AuthService {
    async register(data) {
        const email = data.email.trim().toLowerCase();
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error("E-mail already registered");
        }
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                name: data.name.trim(),
                email,
                passwordHash,
            },
        });
        const token = jsonwebtoken_1.default.sign({ sub: user.id }, jwtSecret, { expiresIn: "1d" });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
    async login(data) {
        const email = data.email.trim().toLowerCase();
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const passwordMatches = await bcrypt_1.default.compare(data.password, user.passwordHash);
        if (!passwordMatches) {
            throw new Error("Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ sub: user.id }, jwtSecret, { expiresIn: "1d" });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
    async me(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
exports.AuthService = AuthService;
