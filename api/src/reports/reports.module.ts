import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [ItemsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
