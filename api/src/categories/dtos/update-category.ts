/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export default class UpdateCategoryBody {
  @ApiProperty()
  @IsNotEmpty({ message: "You must provide an category ID" })
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.toLowerCase() === "true";
    return false;
  })
  @IsOptional()
  available?: boolean;

  @ApiProperty({
    type: "string",
    format: "binary",
  })
  @IsOptional()
  image?: Express.Multer.File;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.toLowerCase() === "true";
    return false;
  })
  deleteImage?: boolean;

  @ApiProperty({
    type: "string",
    format: "binary",
  })
  @IsOptional()
  banner?: Express.Multer.File;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.toLowerCase() === "true";
    return false;
  })
  deleteBanner?: boolean;
}
