import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { ReportsService } from './reports.service';

import ReportBodyRequest from './dtos/reports-body-request';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  //----Swagger configs
  @ApiOperation({
    summary: 'Get all reports',
    tags: ['reports'],
  })
  @ApiOkResponse({
    description: 'A list of all reports',
  })
  //-----
  getAll() {
    return this.reportsService.getAll();
  }

  @Post()
  //----Swagger configs
  @ApiOperation({
    summary: "Set an report, or create if don't exists",
    description: 'Set or create new reports with a type, item id, and a count.',
    tags: ['reports'],
  })
  @ApiCreatedResponse({
    description: 'Report setted or created successfully',
  })
  //-----
  setReport(@Body() data: ReportBodyRequest) {
    return this.reportsService.set(data);
  }

  @Delete(':type/:reportId')
  //----Swagger configs
  @ApiParam({
    name: 'type',
    required: true,
    description: 'Report types: sales_report | search_report',
  })
  @ApiParam({
    name: 'reportId',
    required: true,
    description: 'Report ID',
    example: 1,
  })
  @ApiOperation({
    summary: 'Delete an report',
    description: 'Delete an report with an id',
    tags: ['reports'],
  })
  @ApiOkResponse({
    description: 'Report deleted successfully',
  })
  //-----
  deleteCategory(
    @Param('type') type: string,
    @Param('reportId', ParseIntPipe) reportId: number,
  ) {
    return this.reportsService.delete(type, reportId);
  }
}
