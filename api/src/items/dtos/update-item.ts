/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

export default class UpdateItemBody {
  @ApiProperty()
  @IsNotEmpty({ message: "You must provide an item ID" })
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @Length(0, 100)
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "The price must have a maximum of 2 decimal places",
  })
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.toLowerCase() === "true";
    return false;
  })
  @IsOptional()
  available?: boolean;

  @ApiProperty()
  @Length(1)
  @IsString({ message: "Main category must be an category name" })
  @IsOptional()
  main_category?: string;

  @ApiProperty({
    type: "string",
    format: "binary",
  })
  @IsOptional()
  image_1?: Express.Multer.File | "__delete__";

  @ApiProperty({
    type: "string",
    format: "binary",
  })
  @IsOptional()
  image_2?: Express.Multer.File | "__delete__";

  @ApiProperty({
    type: "string",
    format: "binary",
  })
  @IsOptional()
  image_3?: Express.Multer.File | "__delete__";

  @ApiProperty({
    type: "number",
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  main_image?: number;
}
