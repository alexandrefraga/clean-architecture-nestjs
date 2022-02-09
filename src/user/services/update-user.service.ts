import { UpdateUserUsecase } from '../domain/update-user-usecase';
import { LoadUserById } from '../protocols/load-user-by-id.protocols';

export class UpdateUserService implements UpdateUserUsecase {
  constructor(private loadUserRepository: LoadUserById) {}
  async update(
    id: string,
    data: { name: string; phone: string },
  ): Promise<void> {
    await this.loadUserRepository.loadById(id);
  }
}
