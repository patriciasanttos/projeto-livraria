import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ItemsModule } from 'src/items/items.module';
import { AuthModule } from 'src/authentication/authentication.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [ItemsModule, CategoriesModule, AuthModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
