import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { ReportsService } from './reports.service';

import ReportBodyRequest from './dtos/reports-body-request';
import { AuthGuard } from 'src/auth.guard';
import { EntityType, ReportType } from 'src/@types/types';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @UseGuards(AuthGuard)
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

  @Delete(':type/:entityType/:reportId')
  @UseGuards(AuthGuard)
  //----Swagger configs
  @ApiParam({
    name: 'Report type',
    required: true,
    description: 'Report types: sales | search',
  })
  @ApiParam({
    name: 'Entity type',
    required: true,
    description: 'Entity ID',
    example: 1,
  })
  @ApiParam({
    name: 'Report Id',
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
    @Param('type') type: ReportType,
    @Param('entityType') entityType: EntityType,
    @Param('reportId', ParseIntPipe) reportId: number,
  ) {
    return this.reportsService.delete(type, entityType, reportId);
  }
}
