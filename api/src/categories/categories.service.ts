/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateCategoryBody from './dtos/create-category';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

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
}
