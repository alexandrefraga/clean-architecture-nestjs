import { User } from '../user/user.entity';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAllUsers() {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.find();
  }
}
