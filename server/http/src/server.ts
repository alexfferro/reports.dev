import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { registerRoutes } from "./routes/index";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { resolve } from "path";
import { writeFile } from "node:fs/promises";

const app = fastify();
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifyCors, {
  origin: "*",
});
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Report API",
      version: "1.0.0",
      description: "A REST API for generating reports.",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});
app.register(fastifyMultipart);
app.register(registerRoutes);
app.register(fastifyStatic, {
  root: resolve(__dirname, "../uploads/"),
  prefix: "/uploads",
});

app
  .listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
app.ready().then(() => {
  const spec = app.swagger();
  writeFile(
    resolve(__dirname, "swagger.json"),
    JSON.stringify(spec, null, 2),
    "utf8"
  );
});
