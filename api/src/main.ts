import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import initSwagger from "./swagger";
import * as cookieParser from "cookie-parser";

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  return await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error("Error starting app:", error);
  process.exit(1);
});
