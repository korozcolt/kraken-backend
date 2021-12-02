import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Coordinator } from './coordinator.entity';
import { CoordinatorRepository } from './coordinator.repository';
import { CreateCoordinatorDto } from './dto/create-coordinator.dto';
import { GetCoordinatorsFilterDto } from './dto/get-coordinator-filter.dto';
import { UpdateCoordinatorDto } from './dto/update-coordinator.dto';

@Injectable()
export class CoordinatorService {
  constructor(
    @InjectRepository(CoordinatorRepository)
    private coordinatorRepository: CoordinatorRepository,
  ) {}

  getCoordinators(
    filterDto: GetCoordinatorsFilterDto,
    user: User,
  ): Promise<Coordinator[]> {
    return this.coordinatorRepository.getCoordinator(filterDto, user);
  }

  async getCoordinatorByDni(dni: number, user: User): Promise<Coordinator> {
    const coordinator = await this.coordinatorRepository.findOne({
      where: {
        dni,
        user,
      },
    });
    return coordinator;
  }

  createCoordinator(
    createCoordinatorDto: CreateCoordinatorDto,
    user: User,
  ): Promise<Coordinator> {
    return this.coordinatorRepository.createCoordinator(
      createCoordinatorDto,
      user,
    );
  }

  async deleteCoordinator(id: string, user: User): Promise<void> {
    //const result = await this.taskRepository.delete({ id, user });
    const result = await this.coordinatorRepository
      .findOneOrFail({
        where: { id, user },
      })
      .then((coordinator) => this.coordinatorRepository.remove(coordinator));
    console.log(result);
  }

  async getCoordinatorById(id: string, user: User): Promise<Coordinator> {
    const found = await this.coordinatorRepository.findOneOrFail({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException('Coordinator not found');
    }
    return found;
  }

  async updateCoordinator(
    id: string,
    updateCoordinatorDto: UpdateCoordinatorDto,
    user: User,
  ): Promise<Coordinator> {
    const { name, lastname, email, phone, phone_two, status, birth_date } =
      updateCoordinatorDto;
    const coordinator = await this.getCoordinatorById(id, user);
    coordinator.name = name;
    coordinator.lastname = lastname;
    coordinator.email = email;
    coordinator.phone = phone;
    coordinator.phone_two = phone_two;
    coordinator.birth_date = birth_date;
    coordinator.status = status;
    await this.coordinatorRepository.save(coordinator);
    return coordinator;
  }
}
