import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Coordinator } from './coordinator.entity';
import { GetCoordinatorsFilterDto } from './dto/get-coordinator-filter.dto';
import { CoordinatorStatus } from './coordinator-status.enum';
import { CreateCoordinatorDto } from './dto/create-coordinator.dto';

@EntityRepository(Coordinator)
export class CoordinatorRepository extends Repository<Coordinator> {
  async getCoordinator(
    filterDto: GetCoordinatorsFilterDto,
    user: User,
  ): Promise<Coordinator[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('coordinator');
    query.where({ user });

    if (status) {
      query.andWhere('coordinator.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(coordinator.dni LIKE :search OR LOWER(coordinator.name) LIKE LOWER(:search) OR LOWER(coordinator.lastname) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const coordinators = await query.getMany();
    return coordinators;
  }

  async createCoordinator(
    createCoordinatorDto: CreateCoordinatorDto,
    user: User,
  ): Promise<Coordinator> {
    const { dni, firstname, lastname, email, phone, phone_two, birth_date } =
      createCoordinatorDto;
    const coordinator = this.create({
      dni,
      firstname,
      lastname,
      email,
      phone,
      phone_two,
      birth_date,
      user,
      status: CoordinatorStatus.ACTIVE,
    });
    await this.save(coordinator);
    return coordinator;
  }
}
