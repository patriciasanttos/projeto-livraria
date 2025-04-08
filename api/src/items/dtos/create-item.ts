/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export default class CreateItemBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'You must provide an item name' })
  @Length(5, 100)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Length(0)
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'The price must have a maximum of 2 decimal places',
  })
  price: number;

  @ApiProperty({
    type: 'string',
  })
  @IsEmpty({ message: 'You must provide at least one image' })
  image_1: Express.Multer.File;

  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  image_2?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  image_3?: Express.Multer.File;

  @ApiProperty({
    type: 'number',
  })
  main_image: number;
}
