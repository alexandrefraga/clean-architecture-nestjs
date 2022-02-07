import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../config/typeorm/typeormConfig';
import { UserCustomRepository } from './users/user-custom-repository';
import { User } from './users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserCustomRepository],
  exports: [TypeOrmModule, UserCustomRepository],
})
export class UserDbModule {}
