import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  exports: [ItemsService],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
