import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCustomRepository } from './users/user-repository';
import { User } from './users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserCustomRepository],
  exports: [TypeOrmModule, UserCustomRepository],
})
export class DatabaseModule {}
