/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class CreateCategoryBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'You must provide an category name' })
  @Length(5, 100)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return false;
  })
  @IsOptional()
  available?: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  banner?: Express.Multer.File;
}
