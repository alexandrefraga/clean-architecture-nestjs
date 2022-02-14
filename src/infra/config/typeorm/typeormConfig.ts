import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'adm_development',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: [User],
  synchronize: true,
});
