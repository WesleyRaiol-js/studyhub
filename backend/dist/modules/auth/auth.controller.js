"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const auth_schema_1 = require("./auth.schema");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const data = auth_schema_1.registerSchema.parse(req.body);
            const result = await authService.register(data);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Register failed",
            });
        }
    }
    async login(req, res) {
        try {
            const data = auth_schema_1.loginSchema.parse(req.body);
            const result = await authService.login(data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Login failed",
            });
        }
    }
    async me(req, res) {
        try {
            const userId = req.userId;
            const user = await authService.me(userId);
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Failed to fetch user",
            });
        }
    }
}
exports.AuthController = AuthController;
