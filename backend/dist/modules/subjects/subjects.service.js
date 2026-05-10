"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsService = void 0;
const prisma_1 = require("../../lib/prisma");
class SubjectsService {
    async create(userId, data) {
        const subject = await prisma_1.prisma.subject.create({
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
    async list(userId) {
        return prisma_1.prisma.subject.findMany({
            where: { userId },
            orderBy: { name: "asc" },
        });
    }
    async getById(userId, subjectId) {
        const subject = await prisma_1.prisma.subject.findFirst({
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
    async update(userId, subjectId, data) {
        const existingSubject = await prisma_1.prisma.subject.findFirst({
            where: {
                id: subjectId,
                userId,
            },
        });
        if (!existingSubject) {
            throw new Error("Subject not found");
        }
        return prisma_1.prisma.subject.update({
            where: { id: subjectId },
            data: {
                name: data.name?.trim(),
                code: data.code !== undefined ? data.code.trim() || null : undefined,
                professor: data.professor !== undefined
                    ? data.professor.trim() || null
                    : undefined,
                semester: data.semester?.trim(),
                color: data.color !== undefined ? data.color.trim() || null : undefined,
            },
        });
    }
    async remove(userId, subjectId) {
        const subject = await prisma_1.prisma.subject.findFirst({
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
        if (subject.assignments.length > 0 ||
            subject.exams.length > 0 ||
            subject.grades.length > 0) {
            throw new Error("Subject cannot be deleted because it has related records");
        }
        await prisma_1.prisma.subject.delete({
            where: { id: subjectId },
        });
        return { message: "Subject deleted successfully" };
    }
}
exports.SubjectsService = SubjectsService;
