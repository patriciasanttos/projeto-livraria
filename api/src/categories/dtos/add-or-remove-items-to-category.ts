/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class AddOrRemoveItemsToCategoryBody {
  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide a category ID' })
  @IsNumber()
  itemId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide a category ID' })
  @IsNumber()
  categoryId: number;
}
