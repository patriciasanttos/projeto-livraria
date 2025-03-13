/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import CreateCategoryBody from './dtos/create-category';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createCategory(
    @Body() data: CreateCategoryBody,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    let image: string = '';

    if (file) image = file.buffer.toString('base64');

    return this.categoriesService.create({
      ...data,
      image,
    });
  }
}
