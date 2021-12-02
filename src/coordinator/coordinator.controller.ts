import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Coordinator } from './coordinator.entity';
import { CoordinatorService } from './coordinator.service';
import { CreateCoordinatorDto } from './dto/create-coordinator.dto';
import { GetCoordinatorsFilterDto } from './dto/get-coordinator-filter.dto';
import { UpdateCoordinatorDto } from './dto/update-coordinator.dto';

@ApiTags('Coordinator Controller')
@Controller('coordinator')
@UseGuards(AuthGuard())
export class CoordinatorController {
  private logger = new Logger('CoordinatorController');
  constructor(private coordinatorService: CoordinatorService) {}

  @Get()
  getCoordinator(
    @Query() filterDto: GetCoordinatorsFilterDto,
    @GetUser() user: User,
  ): Promise<Coordinator[]> {
    return this.coordinatorService.getCoordinators(filterDto, user);
  }

  @Get('/:id')
  getCoordinatorById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Coordinator> {
    return this.coordinatorService.getCoordinatorById(id, user);
  }

  @Get('/:id/dni')
  getCoordinatorByDni(
    @Param('dni') dni: number,
    @GetUser() user: User,
  ): Promise<Coordinator> {
    return this.coordinatorService.getCoordinatorByDni(dni, user);
  }

  @Post()
  createCoordinator(
    @Body() createCoordinatorDto: CreateCoordinatorDto,
    @GetUser() user: User,
  ): Promise<Coordinator> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a new coordinator. Data: ${JSON.stringify(
        createCoordinatorDto,
      )}`,
    );
    return this.coordinatorService.createCoordinator(
      createCoordinatorDto,
      user,
    );
  }

  @Patch('/:id/update')
  updateCoordinator(
    @Param('id') id: string,
    @Body() updateCoordinatorDto: UpdateCoordinatorDto,
    @GetUser() user: User,
  ): Promise<Coordinator> {
    return this.coordinatorService.updateCoordinator(
      id,
      updateCoordinatorDto,
      user,
    );
  }

  @Delete('/:id')
  deleteCoordinator(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.coordinatorService.deleteCoordinator(id, user);
  }
}
