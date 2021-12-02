import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateLiderDto } from './dto/create-lider.dto';
import { GetLidersFilterDto } from './dto/filter-lider.dto';
import { UpdateLidersDto } from './dto/update-lider.dto';
import { Lider } from './lider.entity';
import { LiderRepository } from './lider.repository';

@Injectable()
export class LiderService {
  constructor(
    @InjectRepository(LiderRepository)
    private liderRepository: LiderRepository,
  ) {}

  getLiders(filterDto: GetLidersFilterDto, user: User): Promise<Lider[]> {
    return this.liderRepository.getLider(filterDto, user);
  }

  async getLiderByDni(dni: number, user: User): Promise<Lider> {
    const coordinator = await this.liderRepository.findOne({
      where: {
        dni,
        user,
      },
    });
    return coordinator;
  }

  createLider(
    coordinatorId: string,
    createLiderDto: CreateLiderDto,
    user: User,
  ): Promise<Lider> {
    return this.liderRepository.createLider(
      coordinatorId,
      createLiderDto,
      user,
    );
  }

  async deleteLider(id: string, user: User): Promise<void> {
    //const result = await this.taskRepository.delete({ id, user });
    const result = await this.liderRepository
      .findOneOrFail({
        where: { id, user },
      })
      .then((lider) => this.liderRepository.remove(lider));
    console.log(result);
  }

  async getLiderById(id: string, user: User): Promise<Lider> {
    const found = await this.liderRepository.findOneOrFail({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException('Lider not found');
    }
    return found;
  }

  async updateLider(
    id: string,
    updateLiderDto: UpdateLidersDto,
    user: User,
  ): Promise<Lider> {
    const { name, lastname, email, phone, phone_two, status, birth_date } =
      updateLiderDto;
    const lider = await this.getLiderById(id, user);
    lider.name = name;
    lider.lastname = lastname;
    lider.email = email;
    lider.phone = phone;
    lider.phone_two = phone_two;
    lider.birth_date = birth_date;
    lider.status = status;
    await this.liderRepository.save(lider);
    return lider;
  }
}
