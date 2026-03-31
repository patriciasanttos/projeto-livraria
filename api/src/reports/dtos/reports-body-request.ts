/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { EntityType, ReportType } from 'src/@types/types';

export default class ReportBodyRequest {
  @ApiProperty({
    enum: ReportType,
    description: 'Report type: "search" or "sale"',
  })
  @IsNotEmpty({ message: 'You must to especify the report type' })
  @IsEnum(ReportType, {
    message:
      'You must provide a valid report type. Report types: "search" | "sale"',
  })
  type: string;

  @ApiProperty({
    enum: EntityType,
    description: 'Enity types: "item" or "category"',
  })
  @IsNotEmpty({ message: 'You must to especify the entity type' })
  @IsEnum(EntityType, {
    message:
      'You must provide a valid entity type. Enity types: "item" | "category"',
  })
  entityType: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide an entity id' })
  @IsNumber()
  @Min(1)
  entityId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide an count value' })
  @IsNumber()
  @Min(1)
  count: number;
}
