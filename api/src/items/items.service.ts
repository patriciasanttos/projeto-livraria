/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateItemBody from './dtos/create-item';
import UpdateItemBody from './dtos/update-item';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.item.findMany({
      include: {
        categories: true,
      },
    });
  }

  async getItemById(itemId: number) {
    const item = await this.prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item)
      throw new HttpException(
        { message: 'Item not found' },
        HttpStatus.NOT_FOUND,
      );

    return item;
  }

  async create(data: CreateItemBody) {
    return await this.prisma.item.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
      },
    });
  }

  async update(data: UpdateItemBody) {
    await this.getItemById(Number(data.id));

    return await this.prisma.item.update({
      where: {
        id: Number(data.id),
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
      },
    });
  }

  async delete(itemId: number) {
    await this.getItemById(itemId);

    return await this.prisma.$transaction(async (tx) => {
      await tx.item.update({
        where: {
          id: itemId,
        },
        data: {
          categories: {
            set: [],
          },
        },
      });

      await tx.item.delete({ where: { id: itemId } });

      return { message: 'Item deleted successfully' };
    });
  }
}
