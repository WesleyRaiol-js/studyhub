import { Request, Response } from "express";
import { AssignmentsService } from "./assignments.service";
import {
  createAssignmentSchema,
  updateAssignmentSchema,
} from "./assignments.schema";

const assignmentsService = new AssignmentsService();

export class AssignmentsController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.userId as string;
      const data = createAssignmentSchema.parse(req.body);

      const assignment = await assignmentsService.create(userId, data);

      return res.status(201).json(assignment);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Create failed",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const userId = req.userId as string;

      const filters = {
        subjectId: req.query.subjectId as string | undefined,
        status: req.query.status as string | undefined,
        priority: req.query.priority as string | undefined,
      };

      const assignments = await assignmentsService.list(userId, filters);

      return res.status(200).json(assignments);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "List failed",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const userId = req.userId as string;
      const id = String(req.params.id);

      const assignment = await assignmentsService.getById(userId, id);

      return res.status(200).json(assignment);
    } catch (error) {
      return res.status(404).json({
        message: error instanceof Error ? error.message : "Assignment not found",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.userId as string;
      const id = String(req.params.id);
      const data = updateAssignmentSchema.parse(req.body);

      const assignment = await assignmentsService.update(userId, id, data);

      return res.status(200).json(assignment);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Update failed",
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const userId = req.userId as string;
      const id = String(req.params.id);

      const result = await assignmentsService.remove(userId, id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Delete failed",
      });
    }
  }
}
