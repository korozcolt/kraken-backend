import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LiderStatus } from '../lider-status.enum';

export class GetLidersFilterDto {
  @ApiProperty()
  @IsEnum(LiderStatus)
  @IsOptional()
  status?: LiderStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;
}
