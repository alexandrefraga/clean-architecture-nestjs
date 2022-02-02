import { UserModel } from './user-model';

export interface LoadUsersService {
  loadUsers(): Promise<UserModel[]>;
}
