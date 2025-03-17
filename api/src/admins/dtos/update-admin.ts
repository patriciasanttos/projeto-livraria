/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class UpdateAdminBody {
  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide an admin ID' })
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @Length(8, 11)
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @Length(8, 50)
  @IsOptional()
  newPassword?: string;
}
