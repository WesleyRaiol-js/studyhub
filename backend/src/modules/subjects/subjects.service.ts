import { prisma } from "../../lib/prisma";
import { CreateSubjectInput, UpdateSubjectInput } from "./subjects.schema";

export class SubjectsService {
  async create(userId: string, data: CreateSubjectInput) {
    const subject = await prisma.subject.create({
      data: {
        userId,
        name: data.name.trim(),
        code: data.code?.trim() || null,
        professor: data.professor?.trim() || null,
        semester: data.semester.trim(),
        color: data.color?.trim() || null,
      },
    });

    return subject;
  }

  async list(userId: string) {
    return prisma.subject.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });
  }

  async getById(userId: string, subjectId: string) {
    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        userId,
      },
    });

    if (!subject) {
      throw new Error("Subject not found");
    }

    return subject;
  }

  async update(userId: string, subjectId: string, data: UpdateSubjectInput) {
    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        userId,
      },
    });

    if (!existingSubject) {
      throw new Error("Subject not found");
    }

    return prisma.subject.update({
      where: { id: subjectId },
      data: {
        name: data.name?.trim(),
        code: data.code !== undefined ? data.code.trim() || null : undefined,
        professor:
          data.professor !== undefined
            ? data.professor.trim() || null
            : undefined,
        semester: data.semester?.trim(),
        color: data.color !== undefined ? data.color.trim() || null : undefined,
      },
    });
  }

  async remove(userId: string, subjectId: string) {
    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        userId,
      },
      include: {
        assignments: true,
        exams: true,
        grades: true,
      },
    });

    if (!subject) {
      throw new Error("Subject not found");
    }

    if (
      subject.assignments.length > 0 ||
      subject.exams.length > 0 ||
      subject.grades.length > 0
    ) {
      throw new Error(
        "Subject cannot be deleted because it has related records"
      );
    }

    await prisma.subject.delete({
      where: { id: subjectId },
    });

    return { message: "Subject deleted successfully" };
  }
}
