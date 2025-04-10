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
  UseGuards,
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
import { AuthGuard } from 'src/auth.guard';

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
  @UseGuards(AuthGuard)
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
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoriesService.create({ ...data, image });
  }

  @Put()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  //----Swagger configs
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update an category',
    description: 'Update an category with a name, description, or image.',
    tags: ['categories'],
  })
  @ApiOkResponse({
    description: 'Category updated successfully',
  })
  //-----
  updateCategory(
    @Body() data: UpdateCategoryBody,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoriesService.update({ ...data, image });
  }

  @Delete(':categoryId')
  @UseGuards(AuthGuard)
  //----Swagger configs
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: 'Category ID',
    example: 1,
  })
  @ApiOperation({
    summary: 'Delete a category',
    description: 'Delete an category with an id',
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
