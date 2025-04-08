import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { AuthModule } from 'src/authentication/authentication.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [AuthModule, SupabaseModule],
  exports: [ItemsService],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
