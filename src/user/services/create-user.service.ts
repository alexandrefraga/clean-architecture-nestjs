import { CreateUserUsecase } from '../domain/create-user-usecase';
import { CreateUser } from '../protocols/create-user.protocols';
import { Hasher } from '../protocols/hasher.protocols';
import { LoadUserByEmail } from '../protocols/load-user-by-email.protocols';

type input = { name: string; phone: string; email: string; password: string };

export class CreateUserService implements CreateUserUsecase {
  constructor(
    private loadUserbyEmailRepository: LoadUserByEmail,
    private hasher: Hasher,
    private createUserRepository: CreateUser,
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
