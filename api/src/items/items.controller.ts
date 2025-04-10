import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { ItemsService } from './items.service';
import CreateItemBody from './dtos/create-item';
import UpdateItemBody from './dtos/update-item';
import { AuthGuard } from 'src/auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  //----Swagger configs
  @ApiOperation({
    summary: 'Get all items',
    description: 'Get all items with a name, description, price and image.',
    tags: ['items'],
  })
  @ApiOkResponse({
    description: 'A list of all items',
  })
  //-----
  getAll() {
    return this.itemsService.getAll();
  }

  @Get('available')
  //----Swagger configs
  @ApiOperation({
    summary: 'Get all available items',
    description:
      'Get all available items with a name, description, price and image.',
    tags: ['items'],
  })
  @ApiOkResponse({
    description: 'A list of all available items',
  })
  //-----
  getAllAvailables() {
    return this.itemsService.getAllAvailables();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image_1', maxCount: 1 },
      { name: 'image_2', maxCount: 1 },
      { name: 'image_3', maxCount: 1 },
    ]),
  )
  //----Swagger configs
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a new item',
    description: 'Create a new item with a name, description, price and image.',
    tags: ['items'],
  })
  @ApiCreatedResponse({
    description: 'Item created successfully',
  })
  //-----
  createItem(
    @Body() data: CreateItemBody,
    @UploadedFiles()
    images: {
      image_1: Express.Multer.File;
      image_2?: Express.Multer.File;
      image_3?: Express.Multer.File;
    },
  ) {
    return this.itemsService.create({
      ...data,
      image_1: images.image_1[0],
      image_2: images.image_2?.[0],
      image_3: images.image_3?.[0],
    });
  }

  @Put()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image_1', maxCount: 1 },
      { name: 'image_2', maxCount: 1 },
      { name: 'image_3', maxCount: 1 },
    ]),
  )
  //----Swagger configs
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update a item',
    description: 'Update an item with a name, description, price and image.',
    tags: ['items'],
  })
  @ApiOkResponse({
    description: 'Item updated successfully',
  })
  //-----
  updateItem(
    @Body() data: UpdateItemBody,
    @UploadedFiles()
    images: {
      image_1: Express.Multer.File;
      image_2?: Express.Multer.File;
      image_3?: Express.Multer.File;
    },
  ) {
    return this.itemsService.update({
      ...data,
      image_1: images.image_1?.[0],
      image_2: images.image_2?.[0],
      image_3: images.image_3?.[0],
    });
  }

  @Delete(':itemId')
  @UseGuards(AuthGuard)
  //----Swagger configs
  @ApiParam({
    name: 'itemId',
    required: true,
    description: 'Item ID',
    example: 1,
  })
  @ApiOperation({
    summary: 'Delete a item',
    description: 'Delete an item with an id',
    tags: ['items'],
  })
  @ApiOkResponse({
    description: 'Item deleted successfully',
  })
  //-----
  deleteItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemsService.delete(itemId);
  }
}
