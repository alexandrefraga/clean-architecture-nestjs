import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User } from '../../database/users/user.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'adm_development',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: [User],
  synchronize: true,
};
