import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoutes } from "./modules/auth/auth.routes";
import { subjectsRoutes } from "./modules/subjects/subjects.routes";
import { assignmentsRoutes } from "./modules/assignments/assignments.routes";

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    message: "StudyHub API running",
  });
});

app.use("/auth", authRoutes);
app.use("/subjects", subjectsRoutes);
app.use("/assignments", assignmentsRoutes);
