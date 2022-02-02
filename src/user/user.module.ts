import { Module } from '@nestjs/common';
import { UserDbModule } from 'src/infra/database/users/user-database.module';
import { UserRepository } from 'src/infra/database/users/user-repository';
import { SERVICES } from './constants';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [UserDbModule],
  controllers: [UserController],
  providers: [
    {
      provide: SERVICES.LOAD_USERS_SERVICE,
      useFactory: (userRepository: UserRepository) =>
        new UserService(userRepository),
      inject: [UserRepository],
    },
    UserRepository,
  ],
})
export class UserModule {}
