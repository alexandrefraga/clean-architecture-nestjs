import { CreateUserUsecase } from '../domain/create-user-usecase';
import { CreateUserRepository } from '../protocols/create-user-repository';
import { Hasher } from '../protocols/hasher';
import { LoadUserByEmailRepository } from '../protocols/load-user-by-email-repository';

type input = { name: string; phone: string; email: string; password: string };

export class CreateUserService implements CreateUserUsecase {
  constructor(
    private loadUserbyEmailRepository: LoadUserByEmailRepository,
    private hasher: Hasher,
    private createUserRepository: CreateUserRepository,
  ) {}

  async create({
    name,
    phone,
    email,
    password,
  }: input): Promise<{ id: string } | Error> {
    const emailInUse = await this.loadUserbyEmailRepository.loadByEmail(email);
    if (!emailInUse) {
      const hashedPassword = await this.hasher.hash(password);
      return await this.createUserRepository.createUser({
        name,
        phone,
        email,
        password: hashedPassword,
      });
    }
    return new Error('email already registered');
  }
}
