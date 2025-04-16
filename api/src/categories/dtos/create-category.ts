/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

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
