/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateCategoryBody from './dtos/create-category';
import UpdateCategoryBody from './dtos/update-category';
import AddOrRemoveItemsToCategoryBody from './dtos/add-or-remove-items-to-category';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        items: true,
      },
    });

    return categories;
  }

  async create(data: CreateCategoryBody) {
    await this.prisma.$transaction(async (tx) => {
      await tx.category.create({
        data: {
          name: data.name,
          description: data.description,
          image: data.image,
        },
      });
    });

    return data;
  }

  async update(data: UpdateCategoryBody) {
    await this.prisma.$transaction(async (tx) => {
      const category = await tx.category.findUnique({
        where: {
          id: Number(data.id),
        },
      });
      if (!category)
        throw new HttpException(
          {
            message: 'Category not found',
          },
          HttpStatus.NOT_FOUND,
        );

      await tx.category.update({
        where: {
          id: Number(data.id),
        },
        data: {
          name: data.name,
          description: data.description,
          image: data.image,
        },
      });
    });

    return data;
  }

  async delete(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category)
      throw new HttpException(
        {
          message: 'Category not found',
        },
        HttpStatus.NOT_FOUND,
      );

    await this.prisma.category.delete({ where: category });

    return 'Category deleted successfully';
  }

  async addItemToCategory(data: AddOrRemoveItemsToCategoryBody) {
    return await this.prisma.$transaction(async (tx) => {
      const item = await tx.item.findUnique({
        where: {
          id: data.itemId,
        },
      });
      if (!item)
        throw new HttpException(
          {
            message: 'Item not found',
          },
          HttpStatus.BAD_REQUEST,
        );

      const category = await tx.category.findUnique({
        where: {
          id: data.categoryId,
        },
      });
      if (!category)
        throw new HttpException(
          {
            message: 'Category not found',
          },
          HttpStatus.BAD_REQUEST,
        );

      await tx.category.update({
        where: {
          id: data.categoryId,
        },
        data: {
          items: {
            connect: {
              id: data.itemId,
            },
          },
        },
      });

      return 'Item added to category successfully';
    });
  }

  async removeItemFromCategory(data: AddOrRemoveItemsToCategoryBody) {
    await this.prisma.$transaction(async (tx) => {
      const item = await tx.item.findUnique({
        where: {
          id: data.itemId,
        },
      });
      if (!item)
        throw new HttpException(
          {
            message: 'Item not found',
          },
          HttpStatus.BAD_REQUEST,
        );

      const category = await tx.category.findUnique({
        where: {
          id: data.categoryId,
        },
      });
      if (!category)
        throw new HttpException(
          {
            message: 'Category not found',
          },
          HttpStatus.BAD_REQUEST,
        );

      await tx.category.update({
        where: {
          id: data.categoryId,
        },
        data: {
          items: {
            disconnect: {
              id: data.itemId,
            },
          },
        },
      });

      return 'Item removed from category';
    });
  }
}
