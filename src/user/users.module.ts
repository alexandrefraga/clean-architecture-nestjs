import { Module } from '@nestjs/common';
import { UserCustomRepository } from '../infra/database/users/user-repository';
import { BcryptAdapter } from '../infra/cryptography/bcrypt-adapter';
import { CryptographyModule } from '../infra/cryptography/cryptography.module';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserService } from './services/create-user.service';
import { DatabaseModule } from '../infra/database/database.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [
    {
      provide: CreateUserService,
      useFactory: (
        userRepository: UserCustomRepository,
        hasher: BcryptAdapter,
      ) => new CreateUserService(userRepository, hasher, userRepository),
      inject: [UserCustomRepository, BcryptAdapter],
    },
  ],
})
export class UsersModule {}
