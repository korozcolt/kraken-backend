import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Coordinator } from './coordinator.entity';

export const GetCoordinator = createParamDecorator(
  (_data, ctx: ExecutionContext): Coordinator => {
    const req = ctx.switchToHttp().getRequest();
    return req.coordinator;
  },
);
