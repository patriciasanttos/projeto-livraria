/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateCategoryBody from './dtos/create-category';
import UpdateCategoryBody from './dtos/update-category';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsService: ItemsService,
  ) {}

  async getAll() {
    return await this.prisma.category.findMany({
      include: {
        items: true,
      },
    });
  }

  private async getCategoryById(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category)
      throw new HttpException(
        { message: 'Category not found' },
        HttpStatus.NOT_FOUND,
      );

    return category;
  }

  async create(data: CreateCategoryBody) {
    return await this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
  }

  async update(data: UpdateCategoryBody) {
    await this.getCategoryById(Number(data.id));

    return await this.prisma.category.update({
      where: {
        id: Number(data.id),
      },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
  }

  async delete(categoryId: number) {
    await this.getCategoryById(categoryId);

    return await this.prisma.$transaction(async (tx) => {
      await tx.category.update({
        where: { id: categoryId },
        data: {
          items: {
            set: [],
          },
        },
      });

      await tx.category.delete({ where: { id: categoryId } });

      return { message: 'Category deleted successfully' };
    });
  }

  async addItemToCategory({
    categoryId,
    itemId,
  }: {
    categoryId: number;
    itemId: number;
  }) {
    await this.getCategoryById(categoryId);
    await this.itemsService.getItemById(itemId);

    await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        items: {
          connect: {
            id: itemId,
          },
        },
      },
    });

    return { message: 'Item added to category successfully' };
  }

  async removeItemFromCategory({
    categoryId,
    itemId,
  }: {
    categoryId: number;
    itemId: number;
  }) {
    await this.getCategoryById(categoryId);
    await this.itemsService.getItemById(itemId);

    await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        items: {
          disconnect: {
            id: itemId,
          },
        },
      },
    });

    return { message: 'Item removed from category' };
  }
}
