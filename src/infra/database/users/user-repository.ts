import { CreateUserRepository } from 'src/user/protocols/create-user-repository';
import { LoadUserByEmailRepository } from 'src/user/protocols/load-user-by-email-repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserRepository } from 'src/user/protocols/update-user-repository';

@Injectable()
export class UserCustomRepository
  implements CreateUserRepository, LoadUserByEmailRepository, UpdateUserRepository
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<CreateUserRepository.Output> {
    const user = await this.userRepository.create(data);
    const userAccount = await this.userRepository.save(user);
    return userAccount && { id: userAccount.id };
  }

  async loadByEmail(email: string): Promise<LoadUserByEmailRepository.OutPut> {
    const user = await this.userRepository.findOne(
      { email },
      { withDeleted: true },
    );
    return user && { id: user.id, name: user.name };
  }

  async updateUser(id: string, data: { name: string, phone: string }): Promise<void> {
    await this.userRepository.update({ id }, { ...data })
  }
}
