import { Module } from '@nestjs/common';
import { UserDbModule } from 'src/database/user-database.module';
import { UserRepository } from 'src/database/user-repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserDbModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (userRepository: UserRepository) =>
        new UserService(userRepository),
      inject: [UserRepository],
    },
    UserRepository,
  ],
})
export class UserModule {}
