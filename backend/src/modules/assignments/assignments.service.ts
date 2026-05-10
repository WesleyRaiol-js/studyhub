import { prisma } from "../../lib/prisma";
import {
  CreateAssignmentInput,
  UpdateAssignmentInput,
} from "./assignments.schema";

export class AssignmentsService {
  async create(userId: string, data: CreateAssignmentInput) {
    const subject = await prisma.subject.findFirst({
      where: {
        id: data.subjectId,
        userId,
      },
    });

    if (!subject) {
      throw new Error("Subject not found or does not belong to the user");
    }

    return prisma.assignment.create({
      data: {
        userId,
        subjectId: data.subjectId,
        title: data.title.trim(),
        description: data.description?.trim() || null,
        dueDate: new Date(data.dueDate),
        priority: data.priority,
        status: data.status,
      },
    });
  }

  async list(userId: string, filters?: {
    subjectId?: string;
    status?: string;
    priority?: string;
  }) {
    return prisma.assignment.findMany({
      where: {
        userId,
        subjectId: filters?.subjectId,
        status: filters?.status as any,
        priority: filters?.priority as any,
      },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
            semester: true,
          },
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  async getById(userId: string, assignmentId: string) {
    const assignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
        userId,
      },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
            semester: true,
          },
        },
      },
    });

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    return assignment;
  }

  async update(
    userId: string,
    assignmentId: string,
    data: UpdateAssignmentInput
  ) {
    const existingAssignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
        userId,
      },
    });

    if (!existingAssignment) {
      throw new Error("Assignment not found");
    }

    if (data.subjectId) {
      const subject = await prisma.subject.findFirst({
        where: {
          id: data.subjectId,
          userId,
        },
      });

      if (!subject) {
        throw new Error("Subject not found or does not belong to the user");
      }
    }

    return prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        subjectId: data.subjectId,
        title: data.title?.trim(),
        description:
          data.description !== undefined ? data.description.trim() || null : undefined,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        priority: data.priority,
        status: data.status,
      },
    });
  }

  async remove(userId: string, assignmentId: string) {
    const assignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
        userId,
      },
    });

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    await prisma.assignment.delete({
      where: {
        id: assignmentId,
      },
    });

    return {
      message: "Assignment deleted successfully",
    };
  }
}
