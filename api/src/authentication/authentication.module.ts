import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service';

@Module({
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
