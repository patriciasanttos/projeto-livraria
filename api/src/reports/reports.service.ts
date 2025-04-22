import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import ReportBodyRequest from './dtos/reports-body-request';
import { ItemsService } from 'src/items/items.service';
import { EntityType, ReportType } from 'src/@types/types';
import { CategoriesService } from 'src/categories/categories.service';

type GetByIdType = {
  type: ReportType;
  entityType: EntityType;
  entityId?: number;
  reportId?: number;
};

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsService: ItemsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getAll() {
    return {
      items: {
        sales: await this.prisma.saleItemReport.findMany({
          include: {
            item: true,
          },
        }),
        search: await this.prisma.searchItemReport.findMany({
          include: {
            item: true,
          },
        }),
      },

      categories: {
        sales: await this.prisma.saleCategoryReport.findMany({
          include: {
            category: true,
          },
        }),
        search: await this.prisma.searchCategoryReport.findMany({
          include: {
            category: true,
          },
        }),
      },
    };
  }

  private async getById({ type, entityType, entityId, reportId }: GetByIdType) {
    let itemReportedId: number | undefined;
    let categoryReportedId: number | undefined;

    if (entityId && entityType === 'item') {
      const item = await this.itemsService.getById(entityId);
      itemReportedId = item?.id;
    }
    if (entityId && entityType === 'category') {
      const category = await this.categoriesService.getById(entityId);
      categoryReportedId = category?.id;
    }

    return await this.prisma.$transaction(async (tx) => {
      if (type === 'search') {
        if (entityType === 'item')
          return await tx.searchItemReport.findFirst({
            where: {
              id: reportId || undefined,
              itemId: itemReportedId,
            },
          });

        if (entityType === 'category')
          return await tx.searchCategoryReport.findFirst({
            where: {
              id: reportId || undefined,
              categoryId: categoryReportedId,
            },
          });
      }

      if (type === 'sale') {
        if (entityType === 'item')
          return await tx.saleItemReport.findFirst({
            where: {
              id: reportId || undefined,
              itemId: itemReportedId,
            },
          });

        if (entityType === 'category')
          return await tx.saleCategoryReport.findFirst({
            where: {
              id: reportId || undefined,
              categoryId: categoryReportedId,
            },
          });
      }

      throw new HttpException(
        { message: 'Invalid report type' },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async set(data: ReportBodyRequest) {
    const report = await this.getById({
      type: data.type as ReportType,
      entityType: data.entityType as EntityType,
      entityId: data.entityId,
    });

    if (!report) {
      if (data.type === 'search') {
        if (data.entityType === 'item')
          return await this.prisma.searchItemReport.create({
            data: {
              itemId: data.entityId,
              count: data.count,
            },
          });

        if (data.entityType === 'category')
          return await this.prisma.searchCategoryReport.create({
            data: {
              categoryId: data.entityId,
              count: data.count,
            },
          });
      }

      if (data.type === 'sale') {
        if (data.entityType === 'item')
          return await this.prisma.saleItemReport.create({
            data: {
              itemId: data.entityId,
              count: data.count,
            },
          });

        if (data.entityType === 'category')
          return await this.prisma.saleCategoryReport.create({
            data: {
              categoryId: data.entityId,
              count: data.count,
            },
          });
      }
    }

    if (data.type === 'search') {
      if (data.entityType === 'item')
        return await this.prisma.searchItemReport.update({
          where: { itemId: data.entityId },
          data: {
            count: { increment: data.count },
          },
        });

      if (data.entityType === 'category')
        return await this.prisma.searchCategoryReport.update({
          where: { categoryId: data.entityId },
          data: {
            count: { increment: data.count },
          },
        });
    }

    if (data.type === 'sale') {
      if (data.entityType === 'item')
        return await this.prisma.saleItemReport.update({
          where: { itemId: data.entityId },
          data: {
            count: { increment: data.count },
          },
        });

      if (data.entityType === 'category')
        return await this.prisma.saleCategoryReport.update({
          where: { categoryId: data.entityId },
          data: {
            count: { increment: data.count },
          },
        });
    }
  }

  async delete(type: ReportType, entityType: EntityType, reportId: number) {
    const report = await this.getById({ type, entityType, reportId });
    if (!report) {
      throw new HttpException(
        { message: 'Report not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const deleteMap = {
      search: {
        item: this.prisma.searchItemReport,
        category: this.prisma.searchCategoryReport,
      },
      sale: {
        item: this.prisma.saleItemReport,
        category: this.prisma.saleCategoryReport,
      },
    };

    const model = deleteMap[type]?.[entityType];

    if (!model) {
      throw new HttpException(
        { message: 'Invalid report type or entity type' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await (model as any).delete({ where: { id: reportId } });

    return { message: 'Report deleted successfully' };
  }
}
