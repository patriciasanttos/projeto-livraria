/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';

enum ReportType {
  SEARCH_REPORT = 'search_report',
  SALE_REPORT = 'sale_report',
}

export default class ReportBodyRequest {
  @ApiProperty({
    enum: ReportType,
    description: 'Tipo do relatório: search_report ou sale_report',
  })
  @IsNotEmpty({ message: 'You must to especify the report type' })
  @IsEnum(ReportType, {
    message:
      'You must provide a valid report type. Report types: "SEARCH_REPORT" | "SALE_REPORT"',
  })
  type: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide an item id' })
  @IsNumber()
  @Min(1)
  itemId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'You must provide an count value' })
  @IsNumber()
  @Min(1)
  count: number;
}
