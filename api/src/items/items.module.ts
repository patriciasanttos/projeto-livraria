import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { AuthModule } from 'src/authentication/authentication.module';

@Module({
  imports: [AuthModule],
  exports: [ItemsService],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
