import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './src/user/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource ({
  type: 'mssql',
  host: configService.getOrThrow('MSSQL_HOST'),
  port: +configService.getOrThrow('MSSQL_PORT'),
  database: configService.getOrThrow('MSSQL_DATABASE'),
  username: configService.getOrThrow('MSSQL_USERNAME'),
  password: configService.getOrThrow('MSSQL_PASSWORD'),
  migrations: ['migrations/**'],
  options: { trustServerCertificate: true },
  entities: [User],
});
