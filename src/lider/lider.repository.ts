import { User } from 'src/auth/user.entity';
import { CoordinatorService } from 'src/coordinator/coordinator.service';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLiderDto } from './dto/create-lider.dto';
import { GetLidersFilterDto } from './dto/filter-lider.dto';
import { LiderStatus } from './lider-status.enum';
import { Lider } from './lider.entity';

@EntityRepository(Lider)
export class LiderRepository extends Repository<Lider> {
  constructor(private coordinatorService: CoordinatorService) {
    super();
  }

  async getLider(filterDto: GetLidersFilterDto, user: User): Promise<Lider[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('lider');
    query.where({ user });

    if (status) {
      query.andWhere('lider.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(lider.dni LIKE :search OR LOWER(lider.name) LIKE LOWER(:search) OR LOWER(lider.lastname) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const liders = await query.getMany();
    return liders;
  }

  async getLidersByCoordinator(
    coordinatorId: string,
    user: User,
  ): Promise<Lider[]> {
    const liders = await this.find({
      where: { user, coordinatorId },
    });
    return liders;
  }

  async createLider(
    coordinatorId: string,
    createLiderDto: CreateLiderDto,
    user: User,
  ): Promise<Lider> {
    const { name, lastname, email, phone, phone_two, birth_date } =
      createLiderDto;
    const coordinator = await this.coordinatorService.getCoordinatorById(
      coordinatorId,
      user,
    );
    const lider = this.create({
      name,
      lastname,
      email,
      phone,
      phone_two,
      status: LiderStatus.ACTIVE,
      birth_date,
      user,
      coordinator,
    });
    await this.save(lider);
    return lider;
  }
}
