import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../prisma";
import { FileType, ReportsCategory } from "@prisma/client";

export const reports: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/reports",
    {
      schema: {
        description: "List all reports",
        tags: ["reports"],
        operationId: "getReports",
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              title: z.string(),
              description: z.string(),
              category: z.nativeEnum(ReportsCategory),
              pdf_url: z.string().nullable(),
              file_url: z.string().nullable(),
            })
          ),
        },
      },
    },
    async () => {
      const reports = await prisma.reports.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          files: {
            select: {
              url: true,
              type: true,
            },
          },
        },
      });
      const processedReports = reports.map((report) => {
        const pdf = report.files.find((file) => file.type === FileType.PDF);
        const file = report.files.find((file) => file.type !== FileType.PDF);

        return {
          id: report.id,
          title: report.title,
          description: report.description,
          category: report.category,
          pdf_url: pdf?.url || null,
          file_url: file?.url || null,
        };
      });

      return processedReports;
    }
  );
  app.get(
    "/report/:id",
    {
      schema: {
        description: "List an report",
        tags: ["reports"],
        operationId: "getReport",
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            id: z.number().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
            category: z.string().optional(),
            pdf_url: z.string().nullable(),
            file_url: z.string().nullable(),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const report = await prisma.reports.findFirst({
        where: { id: request.params.id },
        include: {
          files: {
            select: {
              url: true,
              type: true,
            },
          },
        },
      });
      if (!report) {
        return reply.status(404).send({ message: "Report not found." });
      }
      const pdf = report?.files.find((file) => file.type === FileType.PDF);
      const file = report?.files.find((file) => file.type !== FileType.PDF);
      const processedReports = {
        id: report.id,
        title: report.title,
        description: report.description,
        category: report.category,
        pdf_url: pdf?.url || null,
        file_url: file?.url || null,
      };

      return reply.status(200).send(processedReports);
    }
  );
  app.post(
    "/report",
    {
      schema: {
        tags: ["reports"],
        description: "Create a report",
        operationId: "createReport",
        body: z.object({
          title: z.string(),
          description: z.string(),
          category: z.nativeEnum(ReportsCategory),
        }),
        response: {
          201: z.object({
            id: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { category, description, title } = request.body;

      const createdReport = await prisma.reports.create({
        data: {
          title,
          description,
          category,
        },
      });
      return reply.status(201).send({ id: createdReport.id });
    }
  );
  app.put(
    "/report/:id",
    {
      schema: {
        tags: ["reports"],
        description: "Update a report",
        operationId: "updateReport",
        body: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          category: z.nativeEnum(ReportsCategory).optional(),
        }),
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { category, description, title } = request.body;
      const { id } = request.params;

      await prisma.reports.update({
        where: { id },
        data: {
          title,
          description,
          category,
        },
      });
      return reply.status(201).send({});
    }
  );
  app.delete(
    "/report/:id",
    {
      schema: {
        description: "Delete an report",
        tags: ["reports"],
        operationId: "deleteReport",
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({}),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (response, reply) => {
      const { id } = response.params;
      const report = await prisma.reports.findUnique({
        where: { id },
      });
      if (!report) {
        return reply.status(404).send({ message: "Report not found" });
      }
      await prisma.reports.delete({
        where: { id },
      });
      return reply.status(200).send({});
    }
  );
};
