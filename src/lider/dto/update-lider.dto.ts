import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsOptional } from 'class-validator';
import { Coordinator } from 'src/coordinator/coordinator.entity';
import { LiderStatus } from '../lider-status.enum';

export class UpdateLidersDto {
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @ApiProperty()
  lastname?: string;

  @IsOptional()
  @ApiProperty()
  phone?: number;

  @IsOptional()
  @ApiProperty()
  phone_two?: number;

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
  status?: LiderStatus;

  @IsOptional()
  @ApiProperty()
  coordinator?: Coordinator;
}
