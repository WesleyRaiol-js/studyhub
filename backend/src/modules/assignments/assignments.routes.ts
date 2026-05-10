import { Router } from "express";
import { AssignmentsController } from "./assignments.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const assignmentsRoutes = Router();
const assignmentsController = new AssignmentsController();

assignmentsRoutes.use(authMiddleware);

assignmentsRoutes.post("/", (req, res) => assignmentsController.create(req, res));
assignmentsRoutes.get("/", (req, res) => assignmentsController.list(req, res));
assignmentsRoutes.get("/:id", (req, res) =>
  assignmentsController.getById(req, res)
);
assignmentsRoutes.put("/:id", (req, res) =>
  assignmentsController.update(req, res)
);
assignmentsRoutes.delete("/:id", (req, res) =>
  assignmentsController.remove(req, res)
);

export { assignmentsRoutes };
