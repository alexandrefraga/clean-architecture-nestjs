import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserDbModule } from './infra/database/users/user-database.module';

@Module({
  imports: [UserModule, UserDbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
