import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUser } from 'src/user/protocols/create-user.protocols';
import { LoadUserByEmail } from 'src/user/protocols/load-user-by-email.protocols';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements CreateUser, LoadUserByEmail
{
  async createUser(data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<CreateUser.Output> {
    const userRepository = getCustomRepository(UserRepository);
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
