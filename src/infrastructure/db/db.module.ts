import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          //__dirname + '/entities/**',
          path.join(__dirname, '/entities', '**'),
          path.join(__dirname, '..','..', '**', '**', 'domain', 'entities', '**'),
          path.join(__dirname, '..','..', '**', 'domain', 'entities', '**'),
        ],
        migrations: [
          __dirname + '/migrations/*.ts'
        ],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
