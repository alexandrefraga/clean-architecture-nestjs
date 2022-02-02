import { LoadUsersService } from '../domain/load-users-service';
import { UserModel } from '../domain/user-model';
import { LoadUsers } from '../protocols/load-users.protocol';

export class UserService implements LoadUsersService {
  constructor(private userRepository: LoadUsers) {}

  async loadUsers(): Promise<UserModel[]> {
    return await this.userRepository.loadUsers();
  }
}
