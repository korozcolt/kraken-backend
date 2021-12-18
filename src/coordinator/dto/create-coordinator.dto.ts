import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCoordinatorDto {
  @IsNotEmpty()
  @ApiProperty()
  dni: string;

  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @ApiProperty()
  phone_two?: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  birth_date: Date;
}
