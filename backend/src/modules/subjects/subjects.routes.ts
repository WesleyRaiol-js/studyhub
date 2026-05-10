import { Router } from "express";
import { SubjectsController } from "./subjects.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const subjectsRoutes = Router();
const subjectsController = new SubjectsController();

subjectsRoutes.use(authMiddleware);

subjectsRoutes.post("/", (req, res) => subjectsController.create(req, res));
subjectsRoutes.get("/", (req, res) => subjectsController.list(req, res));
subjectsRoutes.get("/:id", (req, res) => subjectsController.getById(req, res));
subjectsRoutes.put("/:id", (req, res) => subjectsController.update(req, res));
subjectsRoutes.delete("/:id", (req, res) =>
  subjectsController.remove(req, res)
);

export { subjectsRoutes };
