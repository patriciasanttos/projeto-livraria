/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import CreateCategoryBody from './dtos/create-category';
import UpdateCategoryBody from './dtos/update-category';
import AddOrRemoveItemsToCategoryBody from './dtos/add-or-remove-items-to-category';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  //----Swagger configs
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Get all categories with a name, description, and image.',
    tags: ['categories'],
  })
  @ApiOkResponse({
    description: 'A list of all categories',
  })
  //-----
  getAll() {
    return this.categoriesService.getAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  //----Swagger configs
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a new category',
    description: 'Create a new category with a name, description, and image.',
    tags: ['categories'],
  })
  @ApiCreatedResponse({
    description: 'Category created successfully',
  })
  //-----
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

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  //----Swagger configs
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update a category',
    description: 'Update a category with a name, description, and image.',
    tags: ['categories'],
  })
  @ApiCreatedResponse({
    description: 'Category updated successfully',
  })
  //-----
  updateCategory(
    @Body() data: UpdateCategoryBody,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    let image: string = '';

    if (file) image = file.buffer.toString('base64');

    return this.categoriesService.update({
      ...data,
      image,
    });
  }

  @Delete(':categoryId')
  //----Swagger configs
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: 'Category ID',
    example: 1,
  })
  @ApiOperation({
    summary: 'Delete a category',
    description: 'Delete a category with a id',
    tags: ['categories'],
  })
  @ApiOkResponse({
    description: 'Category deleted successfully',
  })
  //-----
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.delete(categoryId);
  }

  @Patch('add')
  //----Swagger configs
  @ApiOperation({
    summary: 'Add a item to a category',
    description: 'Add a item to a category with a item id, and a category id.',
    tags: ['categories'],
  })
  @ApiOkResponse({
    description: 'Item added to category successfully',
  })
  //-----
  addItemToCategory(@Body() data: AddOrRemoveItemsToCategoryBody) {
    return this.categoriesService.addItemToCategory(data);
  }

  @Patch('remove')
  //----Swagger configs
  @ApiOperation({
    summary: 'Remove a item from category',
    description:
      'Remove a item from category with a item id, and a category id.',
    tags: ['categories'],
  })
  @ApiOkResponse({
    description: 'Item removed from category successfully',
  })
  //-----
  removeItemFromCategory(@Body() data: AddOrRemoveItemsToCategoryBody) {
    return this.categoriesService.removeItemFromCategory(data);
  }
}
