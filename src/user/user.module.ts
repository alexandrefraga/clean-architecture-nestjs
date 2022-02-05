import { Module } from '@nestjs/common';
import { UserCustomRepository } from '../infra/database/users/user-custom-repository';
import { BcryptAdapter } from '../infra/cryptography/bcrypt-adapter';
import { CryptographyModule } from '../infra/cryptography/cryptography.module';
import { UserDbModule } from '../infra/database/users/user-database.module';
import { SERVICES } from './constants';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserService } from './services/create-user.service';

@Module({
  imports: [UserDbModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [
    {
      provide: SERVICES.CREATE_USER_SERVICE,
      useFactory: (
        userRepository: UserCustomRepository,
        hasher: BcryptAdapter,
      ) => new CreateUserService(userRepository, hasher, userRepository),
      inject: [UserCustomRepository, BcryptAdapter],
    },
  ],
})
export class UserModule {}
