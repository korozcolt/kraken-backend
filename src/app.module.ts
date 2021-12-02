import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { CoordinatorModule } from './coordinator/coordinator.module';
import { LiderModule } from './lider/lider.module';

@Module({
  imports: [CoreModule, AuthModule, CoordinatorModule, LiderModule],
})
export class AppModule {}
