import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateCategoryBody from './dtos/create-category';
import UpdateCategoryBody from './dtos/update-category';
import { ItemsService } from 'src/items/items.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsService: ItemsService,
    private readonly supabase: SupabaseService,
  ) {}

  async getAll() {
    return await this.prisma.category.findMany({
      include: {
        items: true,
      },
    });
  }

  private async getById(categoryId: number) {
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
    const category = await this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    if (!data.image) return category;

    const path = `${category.id}/image`;
    const imageUrl = await this.supabase.uploadImage(
      'categories',
      data.image.buffer,
      path,
      data.image.mimetype,
    );

    return await this.prisma.category.update({
      where: { id: category.id },
      data: { image: imageUrl },
    });
  }

  async update(data: UpdateCategoryBody) {
    const category = await this.getById(Number(data.id));

    let imageUrl = '';
    if (data.image) {
      const path = `${category.id}/image`;
      imageUrl = await this.supabase.uploadImage(
        'categories',
        data.image.buffer,
        path,
        data.image.mimetype,
      );
    }

    return await this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: data.name,
        description: data.description,
        image: imageUrl,
      },
    });
  }

  async delete(categoryId: number) {
    await this.getById(categoryId);

    return await this.prisma.$transaction(async (tx) => {
      const category = await tx.category.update({
        where: { id: categoryId },
        data: {
          items: {
            set: [],
          },
        },
      });

      if (category.image) {
        const url = new URL(category.image);
        const path = decodeURIComponent(
          url.pathname.replace('/storage/v1/object/public/categories/', ''),
        );

        await this.supabase.deleteImages('categories', [path]);
      }

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
    await this.getById(categoryId);
    await this.itemsService.getById(itemId);

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
    await this.getById(categoryId);
    await this.itemsService.getById(itemId);

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
