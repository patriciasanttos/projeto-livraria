/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
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

  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  image?: string | null | undefined;
}
