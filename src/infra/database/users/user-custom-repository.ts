import { getCustomRepository } from 'typeorm';
import { CreateUser } from 'src/user/protocols/create-user.protocols';
import { LoadUserByEmail } from 'src/user/protocols/load-user-by-email.protocols';
import { UserRepository } from './user-repository';

export class UserCustomRepository implements CreateUser, LoadUserByEmail {
  constructor(private userRepository: UserRepository) {}
  async createUser(data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<CreateUser.Output> {
    const userRepository = this.userRepository.getCustomRepository();
    const user = userRepository.create(data);
    const userAccount = await userRepository.save(user);
    return userAccount && { id: userAccount.id };
  }

  async loadByEmail(email: string): Promise<LoadUserByEmail.OutPut> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ email }, { withDeleted: true });
    return user && { id: user.id, name: user.name };
  }
}
