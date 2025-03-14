/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export default class CreateItemBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'You must provide a item name' })
  @Length(5, 100)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
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
  image?: string | null | undefined;
}
