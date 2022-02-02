import { UserModel } from '../domain/user-model';

export interface LoadUsers {
  loadUsers(): Promise<UserModel[]>;
}
