"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const subjects_routes_1 = require("./modules/subjects/subjects.routes");
const assignments_routes_1 = require("./modules/assignments/assignments.routes");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
}));
exports.app.use(express_1.default.json());
exports.app.get("/health", (_req, res) => {
    res.status(200).json({
        message: "StudyHub API running",
    });
});
exports.app.use("/auth", auth_routes_1.authRoutes);
exports.app.use("/subjects", subjects_routes_1.subjectsRoutes);
exports.app.use("/assignments", assignments_routes_1.assignmentsRoutes);
