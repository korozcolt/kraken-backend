import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCoordinatorDto {
  @IsNotEmpty()
  @ApiProperty()
  dni: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: number;

  @IsOptional()
  @ApiProperty()
  phone_two?: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  birth_date: Date;
}
