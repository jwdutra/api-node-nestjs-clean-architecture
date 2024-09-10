import { AccessModule } from './access/access.module';
import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './infrastructure/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccessModule,
    TaskModule,
    DbModule,
  ],
  controllers: [],
  providers: [
  ]
})
export class AppModule { }
