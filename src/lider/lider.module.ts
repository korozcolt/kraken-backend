import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LiderController } from './lider.controller';
import { LiderRepository } from './lider.repository';
import { LiderService } from './lider.service';

@Module({
  imports: [TypeOrmModule.forFeature([LiderRepository]), AuthModule],
  controllers: [LiderController],
  providers: [LiderService],
})
export class LiderModule {}
