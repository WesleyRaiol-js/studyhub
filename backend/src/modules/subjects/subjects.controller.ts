import { Request, Response } from "express";
import { SubjectsService } from "./subjects.service";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "./subjects.schema";

const subjectsService = new SubjectsService();

export class SubjectsController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.userId as string;
      const data = createSubjectSchema.parse(req.body);

      const subject = await subjectsService.create(userId, data);

      return res.status(201).json(subject);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Create failed",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const userId = req.userId as string;
      const subjects = await subjectsService.list(userId);

      return res.status(200).json(subjects);
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

      const subject = await subjectsService.getById(userId, id);

      return res.status(200).json(subject);
    } catch (error) {
      return res.status(404).json({
        message: error instanceof Error ? error.message : "Subject not found",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.userId as string;
      const id = String(req.params.id);
      const data = updateSubjectSchema.parse(req.body);

      const subject = await subjectsService.update(userId, id, data);

      return res.status(200).json(subject);
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

      const result = await subjectsService.remove(userId, id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Delete failed",
      });
    }
  }
}
