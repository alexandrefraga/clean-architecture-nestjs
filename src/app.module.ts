import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { CryptographyModule } from './infra/cryptography/cryptography.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './infra/config/typeorm/typeormConfig';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UsersModule,
    CryptographyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
