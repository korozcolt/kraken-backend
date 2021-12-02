import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateLiderDto } from './dto/create-lider.dto';
import { GetLidersFilterDto } from './dto/filter-lider.dto';
import { Lider } from './lider.entity';
import { LiderService } from './lider.service';

@ApiTags('Lider Controller')
@Controller('lider')
@UseGuards(AuthGuard())
export class LiderController {
  private logger = new Logger('LiderController');
  constructor(private liderService: LiderService) {}

  @Get()
  getLider(
    @Query() filterDto: GetLidersFilterDto,
    @GetUser() user: User,
  ): Promise<Lider[]> {
    return this.liderService.getLiders(filterDto, user);
  }

  @Get('/:id')
  getLiderById(@Param('id') id: string, @GetUser() user: User): Promise<Lider> {
    return this.liderService.getLiderById(id, user);
  }

  @Get('/:id/dni')
  getLiderByDni(
    @Param('dni') dni: number,
    @GetUser() user: User,
  ): Promise<Lider> {
    return this.liderService.getLiderByDni(dni, user);
  }

  @Get('/:id/coordinator')
  getLidersByCoordinator(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Lider[]> {
    return this.getLidersByCoordinator(id, user);
  }

  @Post()
  createLider(
    @Param('id') id: string,
    @Body() createLiderDto: CreateLiderDto,
    @GetUser() user: User,
  ): Promise<Lider> {
    return this.liderService.createLider(id, createLiderDto, user);
  }
}
