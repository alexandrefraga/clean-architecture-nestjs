import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getCustomRepository() {
    return getCustomRepository(UserRepository);
  }
}
