"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentsController = void 0;
const assignments_service_1 = require("./assignments.service");
const assignments_schema_1 = require("./assignments.schema");
const assignmentsService = new assignments_service_1.AssignmentsService();
class AssignmentsController {
    async create(req, res) {
        try {
            const userId = req.userId;
            const data = assignments_schema_1.createAssignmentSchema.parse(req.body);
            const assignment = await assignmentsService.create(userId, data);
            return res.status(201).json(assignment);
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
            const filters = {
                subjectId: req.query.subjectId,
                status: req.query.status,
                priority: req.query.priority,
            };
            const assignments = await assignmentsService.list(userId, filters);
            return res.status(200).json(assignments);
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
            const assignment = await assignmentsService.getById(userId, id);
            return res.status(200).json(assignment);
        }
        catch (error) {
            return res.status(404).json({
                message: error instanceof Error ? error.message : "Assignment not found",
            });
        }
    }
    async update(req, res) {
        try {
            const userId = req.userId;
            const id = String(req.params.id);
            const data = assignments_schema_1.updateAssignmentSchema.parse(req.body);
            const assignment = await assignmentsService.update(userId, id, data);
            return res.status(200).json(assignment);
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
            const result = await assignmentsService.remove(userId, id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Delete failed",
            });
        }
    }
}
exports.AssignmentsController = AssignmentsController;
