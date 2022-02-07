import { CreateUser } from 'src/user/protocols/create-user.protocols';
import { LoadUserByEmail } from 'src/user/protocols/load-user-by-email.protocols';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserCustomRepository implements CreateUser, LoadUserByEmail {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<CreateUser.Output> {
    const user = this.userRepository.create(data);
    const userAccount = await this.userRepository.save(user);
    return userAccount && { id: userAccount.id };
  }

  async loadByEmail(email: string): Promise<LoadUserByEmail.OutPut> {
    const user = await this.userRepository.findOne(
      { email },
      { withDeleted: true },
    );
    return user && { id: user.id, name: user.name };
  }
}
