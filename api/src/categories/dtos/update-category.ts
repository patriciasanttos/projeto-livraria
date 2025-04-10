/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export default class UpdateCategoryBody {
  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide an category ID' })
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  image?: Express.Multer.File;
}
