/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export default class UpdateItemBody {
  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide an item ID' })
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

  @ApiProperty()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'The price must have a maximum of 2 decimal places',
  })
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return false;
  })
  available?: boolean;

  @ApiProperty()
  @IsInt({ message: 'Main category must be an id' })
  @Min(1)
  @IsOptional()
  main_category?: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image_1?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image_2?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image_3?: Express.Multer.File;

  @ApiProperty({
    type: 'number',
  })
  @IsOptional()
  @IsInt({ message: 'You must provide the main image index' })
  main_image?: number;
}
