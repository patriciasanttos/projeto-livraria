import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [PrismaModule, CategoriesModule],
})
export class AppModule {}
