/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class CreateAdminBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'You must provide an admin name' })
  @Length(5, 100)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'You must provide an admin email' })
  @Length(5, 100)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'You must provide an admin phone' })
  @Length(8, 15)
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'You must provide an admin password' })
  @Length(8, 50)
  password: string;
}
