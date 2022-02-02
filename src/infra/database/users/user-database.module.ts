import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../../config/typeorm/typeormConfig';
import { UserRepository } from './user-repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  exports: [TypeOrmModule],
})
export class UserDbModule {}
