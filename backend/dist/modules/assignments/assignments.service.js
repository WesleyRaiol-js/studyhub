"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentsService = void 0;
const prisma_1 = require("../../lib/prisma");
class AssignmentsService {
    async create(userId, data) {
        const subject = await prisma_1.prisma.subject.findFirst({
            where: {
                id: data.subjectId,
                userId,
            },
        });
        if (!subject) {
            throw new Error("Subject not found or does not belong to the user");
        }
        return prisma_1.prisma.assignment.create({
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
    async list(userId, filters) {
        return prisma_1.prisma.assignment.findMany({
            where: {
                userId,
                subjectId: filters?.subjectId,
                status: filters?.status,
                priority: filters?.priority,
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
    async getById(userId, assignmentId) {
        const assignment = await prisma_1.prisma.assignment.findFirst({
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
    async update(userId, assignmentId, data) {
        const existingAssignment = await prisma_1.prisma.assignment.findFirst({
            where: {
                id: assignmentId,
                userId,
            },
        });
        if (!existingAssignment) {
            throw new Error("Assignment not found");
        }
        if (data.subjectId) {
            const subject = await prisma_1.prisma.subject.findFirst({
                where: {
                    id: data.subjectId,
                    userId,
                },
            });
            if (!subject) {
                throw new Error("Subject not found or does not belong to the user");
            }
        }
        return prisma_1.prisma.assignment.update({
            where: {
                id: assignmentId,
            },
            data: {
                subjectId: data.subjectId,
                title: data.title?.trim(),
                description: data.description !== undefined ? data.description.trim() || null : undefined,
                dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
                priority: data.priority,
                status: data.status,
            },
        });
    }
    async remove(userId, assignmentId) {
        const assignment = await prisma_1.prisma.assignment.findFirst({
            where: {
                id: assignmentId,
                userId,
            },
        });
        if (!assignment) {
            throw new Error("Assignment not found");
        }
        await prisma_1.prisma.assignment.delete({
            where: {
                id: assignmentId,
            },
        });
        return {
            message: "Assignment deleted successfully",
        };
    }
}
exports.AssignmentsService = AssignmentsService;
