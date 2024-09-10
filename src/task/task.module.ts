import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './application/controllers/task.controller';
import { TaskEntity } from './domain/entities/task.entity';
import { CreateTaskService } from './application/usecases/createtask.service';
import { FindTaskByIdService } from './application/usecases/findtaskbyid.service';
import { TaskMapper } from './application/mappers/task.mapper';
import { FindAllTasksService } from './application/usecases/findalltasks.service';
import { UpdateTaskService } from './application/usecases/updatetask.service';
import { RemoveTaskService } from './application/usecases/removetask.service';
import { TypeOrmTaskRepository } from './infrastructure/repositories/typeorm-task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [
    CreateTaskService,
    FindTaskByIdService,
    FindAllTasksService,
    UpdateTaskService,
    RemoveTaskService,
    TaskMapper,
    TypeOrmTaskRepository,
  ],
  exports: [TypeOrmTaskRepository],
})
export class TaskModule { }
