import { FileType } from "@prisma/client";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../prisma";
import { resolve, join } from "node:path";
import { pipeline } from "node:stream/promises";
import fs from "fs";

export const files: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/files",
    {
      schema: {
        description: "List all files",
        tags: ["files"],
        operationId: "getFiles",
        response: {
          200: z.array(
            z.object({
              url: z.string(),
              reportId: z.number(),
              type: z.nativeEnum(FileType),
            })
          ),
        },
      },
    },
    async () => {
      const files = await prisma.file.findMany();
      return files;
    }
  );
  app.post(
    "/files/:id",
    {
      schema: {
        description: "Create an file",
        tags: ["files"],
        operationId: "createFiles",
        consumes: ["multipart/form-data"],
        response: {
          201: z.object({}),
          500: z.object({ message: z.string() }),
        },
        params: z.object({
          id: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const files = await request.files();
      const path = resolve(__dirname, "../../uploads/");

      try {
        for await (const file of files) {
          const fileType =
            file.mimetype === "application/pdf" ? "PDF" : "REPORT";
          const directory = fileType === "PDF" ? "pdfs" : "reports";
          const filePath = resolve(path, `${directory}/${id}-${file.filename}`);
          const formattedPath = `/uploads/${directory}/${id}-${file.filename}`;
          await pipeline(file.file, fs.createWriteStream(filePath));
          await prisma.file.create({
            data: {
              url: formattedPath,
              type: fileType,
              reportId: id,
            },
          });
        }
        reply.status(201).send();
      } catch (error) {
        console.error("Erro ao processar arquivos:", error);
        reply
          .status(500)
          .send({ message: "Erro no processamento dos arquivos." });
      }
    }
  );
  app.put(
    "/files/:id",
    {
      schema: {
        description: "Update an file",
        tags: ["files"],
        operationId: "updateFiles",
        consumes: ["multipart/form-data"],
        response: {
          201: z.object({}),
          500: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
        params: z.object({
          id: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const files = await request.files();
      const path = resolve(__dirname, "../../uploads/");
      const existingFiles = await prisma.file.findMany({
        where: { reportId: id },
      });
      if (!existingFiles) {
        return reply.status(404).send({ message: "Arquivo não encontrado." });
      }

      for (const file of existingFiles) {
        try {
          const fullPath = join(__dirname, "../../", file.url);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        } catch (error) {}

        // Remove o registro do banco
        await prisma.file.delete({
          where: { id: file.id },
        });
      }

      try {
        for await (const file of files) {
          const fileType =
            file.mimetype === "application/pdf" ? "PDF" : "REPORT";
          const directory = fileType === "PDF" ? "pdfs" : "reports";
          const filePath = resolve(path, `${directory}/${id}-${file.filename}`);
          const formattedPath = `/uploads/${directory}/${id}-${file.filename}`;
          await pipeline(file.file, fs.createWriteStream(filePath));
          await prisma.file.create({
            data: {
              url: formattedPath,
              type: fileType,
              reportId: id,
            },
          });
        }
        reply.status(201).send();
      } catch (error) {
        console.error("Erro ao processar arquivos:", error);
        reply
          .status(500)
          .send({ message: "Erro no processamento dos arquivos." });
      }
    }
  );
  app.delete(
    "/files/:id",
    {
      schema: {
        description: "Delete an file",
        tags: ["files"],
        operationId: "deleteFiles",
        consumes: ["multipart/form-data"],
        response: {
          201: z.object({}),
          404: z.object({ message: z.string() }),
        },
        params: z.object({
          id: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const existingFiles = await prisma.file.findMany({
        where: { reportId: id },
      });
      if (!existingFiles) {
        return reply.status(404).send({ message: "Arquivo não encontrado." });
      }

      for (const file of existingFiles) {
        try {
          const fullPath = join(__dirname, "../../", file.url);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        } catch (error) {
          reply.status(404).send({ message: "Erro ao deletar o arquivo" });
        }

        await prisma.file.delete({
          where: { id: file.id },
        });
      }
      reply.status(201).send();
    }
  );
};
