import { UpdateUserUsecase } from '../domain/update-user-usecase';
import { LoadUserByIdRepository } from '../protocols/load-user-by-id-repository';
import { UpdateUserRepository } from '../protocols/update-user-repository';

export class UpdateUserService implements UpdateUserUsecase {
  constructor(
    private readonly loadUserRepository: LoadUserByIdRepository,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}
  async update(
    id: string,
    data: { name: string; phone: string },
  ): Promise<null | Error> {
    const user = await this.loadUserRepository.loadById(id);
    if (!user) {
      return new Error('user not found');
    }
    await this.updateUserRepository.updateUser(id, data);
    return null;
  }
}
