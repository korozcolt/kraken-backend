import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CoordinatorStatus } from '../coordinator-status.enum';

export class GetCoordinatorsFilterDto {
  @ApiProperty()
  @IsEnum(CoordinatorStatus)
  @IsOptional()
  status?: CoordinatorStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;
}
