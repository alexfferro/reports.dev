import { FastifyInstance } from "fastify";
import { reports } from "./reports";
import { files } from "./files";
import { tutoriais } from "./tutorials";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(reports);
  await app.register(files);
  await app.register(tutoriais);
}
