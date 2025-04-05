import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import ReportBodyRequest from './dtos/reports-body-request';
import { ItemsService } from 'src/items/items.service';

type GetByIdType = {
  type: string;
  itemId?: number;
  reportId?: number;
};

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsService: ItemsService,
  ) {}

  async getAll() {
    return {
      salesReports: await this.prisma.saleReport.findMany({
        include: {
          item: true,
        },
      }),
      searchReports: await this.prisma.searchReport.findMany({
        include: {
          item: true,
        },
      }),
    };
  }

  private async getById({ type, itemId, reportId }: GetByIdType) {
    let itemToGet: number | undefined;

    if (itemId) {
      const item = await this.itemsService.getById(itemId);
      itemToGet = item?.id;
    }

    return await this.prisma.$transaction(async (tx) => {
      if (type === 'search_report') {
        return await tx.searchReport.findFirst({
          where: {
            id: reportId || undefined,
            itemId: itemToGet,
          },
        });
      }

      if (type === 'sale_report') {
        return await tx.saleReport.findFirst({
          where: {
            id: reportId || undefined,
            itemId: itemToGet,
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
    const report = await this.getById({ type: data.type, itemId: data.itemId });

    if (!report) {
      return data.type === 'search_report'
        ? await this.prisma.searchReport.create({
            data: {
              itemId: data.itemId,
              count: data.count,
            },
          })
        : await this.prisma.saleReport.create({
            data: {
              itemId: data.itemId,
              count: data.count,
            },
          });
    }

    return data.type === 'search_report'
      ? await this.prisma.searchReport.update({
          where: { itemId: data.itemId },
          data: {
            count: { increment: data.count },
          },
        })
      : await this.prisma.saleReport.update({
          where: { itemId: data.itemId },
          data: {
            count: { increment: data.count },
          },
        });
  }

  async delete(type: string, reportId: number) {
    console.log(type);

    const report = await this.getById({ type, reportId });
    if (!report)
      throw new HttpException(
        { message: 'Report not found' },
        HttpStatus.NOT_FOUND,
      );

    return await this.prisma.$transaction(async (tx) => {
      type === 'search_report'
        ? await tx.searchReport.delete({ where: { id: reportId } })
        : await tx.saleReport.delete({ where: { id: reportId } });

      return { message: 'Report deleted successfully' };
    });
  }
}
