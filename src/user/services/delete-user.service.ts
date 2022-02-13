import { DeleteUserUsecase } from '../domain/delete-user-usecase';
import { DeleteUserRepository } from '../protocols/delete-user-repository';
import { LoadUserByIdRepository } from '../protocols/load-user-by-id-repository';

export class DeleteUserService implements DeleteUserUsecase {
  constructor(
    private loadUserRepository: LoadUserByIdRepository,
    private deleteUserRepository: DeleteUserRepository,
  ) {}
  async deleteById(id: string): Promise<null | Error> {
    const existentUser = await this.loadUserRepository.loadById(id);
    if (!existentUser) {
      return new Error('user not found');
    }
    await this.deleteUserRepository.deleteById(id);
    return null;
  }
}
