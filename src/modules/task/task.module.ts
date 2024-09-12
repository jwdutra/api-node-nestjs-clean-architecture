import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './application/controllers/task.controller';
import { TaskEntity } from './domain/entities/task.entity';
import { CreateTaskService } from './application/usecases/create-task.service';
import { FindTaskByIdService } from './application/usecases/find-task-by-id.service';
import { TaskMapper } from './application/mappers/task.mapper';
import { FindAllTasksService } from './application/usecases/find-all-tasks.service';
import { UpdateTaskService } from './application/usecases/update-task.service';
import { RemoveTaskService } from './application/usecases/remove-task.service';
import { TaskRepository } from './infrastructure/repositories/task.repository';

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
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
  ],
  exports: ['ITaskRepository'],
})
export class TaskModule { }
