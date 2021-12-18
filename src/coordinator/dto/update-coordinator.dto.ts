import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsOptional } from 'class-validator';
import { CoordinatorStatus } from '../coordinator-status.enum';

export class UpdateCoordinatorDto {
  @IsOptional()
  @ApiProperty()
  firstname?: string;

  @IsOptional()
  @ApiProperty()
  lastname?: string;

  @IsOptional()
  @ApiProperty()
  phone?: string;

  @IsOptional()
  @ApiProperty()
  phone_two?: string;

  @IsOptional()
  @ApiProperty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiProperty()
  @IsDate()
  birth_date?: Date;

  @IsOptional()
  @ApiProperty()
  status?: CoordinatorStatus;
}
