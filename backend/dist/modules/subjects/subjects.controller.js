"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsController = void 0;
const subjects_service_1 = require("./subjects.service");
const subjects_schema_1 = require("./subjects.schema");
const subjectsService = new subjects_service_1.SubjectsService();
class SubjectsController {
    async create(req, res) {
        try {
            const userId = req.userId;
            const data = subjects_schema_1.createSubjectSchema.parse(req.body);
            const subject = await subjectsService.create(userId, data);
            return res.status(201).json(subject);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Create failed",
            });
        }
    }
    async list(req, res) {
        try {
            const userId = req.userId;
            const subjects = await subjectsService.list(userId);
            return res.status(200).json(subjects);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "List failed",
            });
        }
    }
    async getById(req, res) {
        try {
            const userId = req.userId;
            const id = String(req.params.id);
            const subject = await subjectsService.getById(userId, id);
            return res.status(200).json(subject);
        }
        catch (error) {
            return res.status(404).json({
                message: error instanceof Error ? error.message : "Subject not found",
            });
        }
    }
    async update(req, res) {
        try {
            const userId = req.userId;
            const id = String(req.params.id);
            const data = subjects_schema_1.updateSubjectSchema.parse(req.body);
            const subject = await subjectsService.update(userId, id, data);
            return res.status(200).json(subject);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Update failed",
            });
        }
    }
    async remove(req, res) {
        try {
            const userId = req.userId;
            const id = String(req.params.id);
            const result = await subjectsService.remove(userId, id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Delete failed",
            });
        }
    }
}
exports.SubjectsController = SubjectsController;
