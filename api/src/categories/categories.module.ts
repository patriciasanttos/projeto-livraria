import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ItemsModule } from 'src/items/items.module';
import { AuthModule } from 'src/authentication/authentication.module';

@Module({
  imports: [ItemsModule, AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
