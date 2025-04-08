/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
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
  @IsOptional()
  available?: boolean;

  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'You must provide the url of the old image' })
  @IsOptional()
  old_image_1?: string;

  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  image_1?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'You must provide the url of the old image' })
  @IsOptional()
  old_image_2?: string;

  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  image_2?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'You must provide the url of the old image' })
  @IsOptional()
  old_image_3?: string;

  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  image_3?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  @IsString({ message: 'You must provide the url of the main image' })
  main_image?: string;
}
