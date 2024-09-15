import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import path from 'path';
import { UserEntity } from '../../modules/access/users/infrastructure/persistence-entities/user.entity';
import { TaskEntity } from '../../modules/task/infrastructure/persistence-entities/task.entity';
//import { UserEntity } from '../../modules/access/users/domain/entities/user.entity'; 
//import { TaskEntity } from '../../modules/task/domain/entities/task.entity'; 
import { DataSource, DataSourceOptions } from 'typeorm';


config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [TaskEntity, UserEntity],
  migrations: [
    __dirname + '/migrations/*.ts',
  ],
};

export default new DataSource(dataSourceOptions);
