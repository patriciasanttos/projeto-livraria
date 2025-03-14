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
    const items = await this.prisma.item.findMany({
      include: {
        categories: true,
      },
    });

    return items;
  }

  async create(data: CreateItemBody) {
    await this.prisma.$transaction(async (tx) => {
      await tx.item.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
        },
      });
    });

    return data;
  }

  async update(data: UpdateItemBody) {
    await this.prisma.$transaction(async (tx) => {
      const item = await tx.item.findUnique({
        where: {
          id: Number(data.id),
        },
      });
      if (!item)
        throw new HttpException(
          {
            message: 'Item not found',
          },
          HttpStatus.NOT_FOUND,
        );

      await tx.item.update({
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
    });

    return data;
  }

  async delete(itemId: number) {
    const item = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    if (!item)
      throw new HttpException(
        {
          message: 'Item not found',
        },
        HttpStatus.NOT_FOUND,
      );

    await this.prisma.item.delete({ where: item });

    return 'Item deleted successfully';
  }
}
