/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class UpdateCategoryBody {
  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide a category ID' })
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  name?: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  description?: string;

  @ApiProperty({
    type: 'string',
  })
  image?: string | null | undefined;
}
