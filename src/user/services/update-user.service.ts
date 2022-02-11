import { UpdateUserUsecase } from '../domain/update-user-usecase';
import { LoadUserByIdRepository } from '../protocols/load-user-by-id-repository';

export class UpdateUserService implements UpdateUserUsecase {
  constructor(private loadUserRepository: LoadUserByIdRepository) {}
  async update(
    id: string,
    data: { name: string; phone: string },
  ): Promise<any> {
    await this.loadUserRepository.loadById(id);
    return new Error('user not found')
  }
}
