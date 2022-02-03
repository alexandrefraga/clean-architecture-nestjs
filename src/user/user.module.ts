import { Module } from '@nestjs/common';
import { BcryptAdapter } from '../infra/cryptography/bcrypt-adapter';
import { CryptographyModule } from '../infra/cryptography/cryptography.module';
import { UserDbModule } from '../infra/database/users/user-database.module';
import { UserRepository } from '../infra/database/users/user-repository';
import { SERVICES } from './constants';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserService } from './services/create-user.service';

@Module({
  imports: [UserDbModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [
    {
      provide: SERVICES.CREATE_USER_SERVICE,
      useFactory: (userRepository: UserRepository, hasher: BcryptAdapter) =>
        new CreateUserService(userRepository, hasher, userRepository),
      inject: [UserRepository, BcryptAdapter],
    },
    UserRepository,
  ],
})
export class UserModule {}
