import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ItemsModule } from 'src/items/items.module';
import { AuthModule } from 'src/authentication/authentication.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [ItemsModule, AuthModule, SupabaseModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
