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
    return this.categoriesService.create({
      ...data,
      image: file ? file.buffer.toString('base64') : '',
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
  @ApiOkResponse({
    description: 'Category updated successfully',
  })
  //-----
  updateCategory(
    @Body() data: UpdateCategoryBody,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    const updateData = { ...data };

    if (file) updateData.image = file.buffer.toString('base64');

    return this.categoriesService.update(updateData);
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

  @Patch(':categoryId/items/:itemId/add')
  //----Swagger configs
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: 'Category ID',
    example: 1,
  })
  @ApiParam({
    name: 'itemId',
    required: true,
    description: 'Item ID',
    example: 1,
  })
  @ApiOperation({
    summary: 'Add an item to a category',
    description:
      'Add an item to a category with an item id, and a category id.',
    tags: ['categories'],
  })
  @ApiOkResponse({
    description: 'Item added to category successfully',
  })
  //-----
  addItemToCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.categoriesService.addItemToCategory({
      categoryId,
      itemId,
    });
  }

  @Patch(':categoryId/items/:itemId/remove')
  //----Swagger configs
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: 'Category ID',
    example: 1,
  })
  @ApiParam({
    name: 'itemId',
    required: true,
    description: 'Item ID',
    example: 1,
  })
  @ApiOperation({
    summary: 'Remove an item from a category',
    description:
      'Remove an item from a category with an item id, and a category id.',
    tags: ['categories'],
  })
  @ApiOkResponse({
    description: 'Item removed from category successfully',
  })
  //-----
  removeItemFromCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.categoriesService.removeItemFromCategory({
      categoryId,
      itemId,
    });
  }
}
