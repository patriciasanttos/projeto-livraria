import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AuthGuard } from 'src/auth.guard';
import { AuthModule } from 'src/authentication/authentication.module';

@Module({
  imports: [AuthModule],
  controllers: [AdminsController],
  providers: [AdminsService, AuthGuard],
})
export class AdminsModule {}
