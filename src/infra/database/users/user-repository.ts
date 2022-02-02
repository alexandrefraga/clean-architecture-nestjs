import { User } from './user.entity';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { LoadUsers } from 'src/user/protocols/load-users.protocol';

@EntityRepository(User)
export class UserRepository extends Repository<User> implements LoadUsers {
  async loadUsers(): Promise<any[]> {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.find();
  }
}
