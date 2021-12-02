import { Module } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { CoordinatorController } from './coordinator.controller';
import { CoordinatorRepository } from './coordinator.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoordinatorRepository]),
    AuthModule,
    CoordinatorModule,
  ],
  providers: [CoordinatorService],
  controllers: [CoordinatorController],
})
export class CoordinatorModule {}
