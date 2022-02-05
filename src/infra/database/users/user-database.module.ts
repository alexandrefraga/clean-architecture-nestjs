import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../../config/typeorm/typeormConfig';
import { UserCustomRepository } from './user-custom-repository';
import { UserRepository } from './user-repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    {
      provide: UserCustomRepository,
      useFactory: (userRepository: UserRepository) =>
        new UserCustomRepository(userRepository),
      inject: [UserRepository],
    },
  ],
  exports: [UserCustomRepository],
})
export class UserDbModule {}
