import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import initSwagger from "./swagger";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { ExpressAdapter } from "@nestjs/platform-express";

const expressApp = express();

export default async function createApp() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  initSwagger(app);

  await app.init();
  return expressApp;
}
