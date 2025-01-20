import { z } from "zod";
import { prisma } from "../prisma";
import { ReportsCategory, type Prisma } from "@prisma/client";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const tutoriais: FastifyPluginAsyncZod = async (app) => {
  const schema = z.object({
    title: z.string().min(1, "Titulo é obrigatório"),
    category: z.nativeEnum(ReportsCategory),
  });

  app.post(
    "/tutorials",
    {
      schema: {
        tags: ["tutorials"],
        description: "Create an new Tutorial",
        operationId: "createTutorial",
        body: schema,
        response: {
          201: z.object({
            id: z.coerce.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, category } = request.body;

      const tutorial = await prisma.tutorials.create({
        data: { title, category },
      });
      reply.status(201).send({ id: tutorial.id });
    }
  );
  app.get(
    "/tutorials",
    {
      schema: {
        tags: ["tutorials"],
        description: "List all Tutorials",
        operationId: "getTutorials",
        response: {
          200: z.array(
            z.object({
              id: z.coerce.number(),
              title: z.string(),
              category: z.nativeEnum(ReportsCategory),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const tutorials = await prisma.tutorials.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      reply.status(200).send(tutorials);
    }
  );
  app.get(
    "/tutorials/:id",
    {
      schema: {
        tags: ["tutorials"],
        description: "Get a tutorial by ID",
        operationId: "getTutorial",
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            id: z.coerce.number(),
            title: z.string(),
            content: z.string().nullable(),
            category: z.nativeEnum(ReportsCategory),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const tutorial = await prisma.tutorials.findUnique({
        where: { id },
      });
      if (!tutorial) {
        return reply.status(404).send({ message: "Tutorial não encontrado" });
      }
      reply.status(200).send(tutorial);
    }
  );
  app.put(
    "/tutorials/:id",
    {
      schema: {
        tags: ["tutorials"],
        description: "Update a tutorial by ID",
        operationId: "updateTutorial",
        params: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({
          title: z.string().min(1, "Titulo Obrigatório").optional(),
          category: z.nativeEnum(ReportsCategory).optional(),
          content: z.string().optional(),
        }),
        response: {
          200: z.object({
            id: z.coerce.number(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { category, content, title } = request.body;

      const tutorial = await prisma.tutorials.update({
        where: { id },
        data: { category, content, title },
      });

      reply.status(200).send(tutorial);
    }
  );
  app.delete(
    "/tutorials/:id",
    {
      schema: {
        tags: ["tutorials"],
        description: "Delete a tutorial by ID",
        operationId: "deleteTutorial",
        params: z.object({
          id: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      await prisma.tutorials.delete({
        where: { id },
      });
      reply.status(204);
    }
  );
};
