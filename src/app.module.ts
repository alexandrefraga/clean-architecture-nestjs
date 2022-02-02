import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserDbModule } from './infra/database/users/user-database.module';
import { CryptographyModule } from './infra/cryptography/cryptography.module';

@Module({
  imports: [UserModule, UserDbModule, CryptographyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
