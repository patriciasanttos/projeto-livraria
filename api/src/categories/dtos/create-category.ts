/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class CreateCategoryBody {
  @IsString()
  @IsNotEmpty({ message: 'You must provide a category name' })
  @Length(5, 20)
  name: string;

  @IsString()
  @Length(5, 100)
  description?: string;

  image: string | null | undefined;
}
