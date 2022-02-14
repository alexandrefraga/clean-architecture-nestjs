import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { CryptographyModule } from './infra/cryptography/cryptography.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './infra/config/typeorm/typeormConfig';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig()),
    UsersModule,
    CryptographyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
