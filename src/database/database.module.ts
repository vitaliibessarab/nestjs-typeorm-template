import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.getOrThrow('MSSQL_HOST'),
        port: +configService.getOrThrow('MSSQL_PORT'),
        database: configService.getOrThrow('MSSQL_DATABASE'),
        username: configService.getOrThrow('MSSQL_USERNAME'),
        password: configService.getOrThrow('MSSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MSSQL_SYNCHRONIZE'),
        options: { trustServerCertificate: true },
        // options: { encrypt: false },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
