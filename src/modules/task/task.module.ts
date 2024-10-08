import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskService } from './application/usecases/create-task.service';
import { FindTaskByIdService } from './application/usecases/find-task-by-id.service';
import { TaskMapper } from './application/mappers/task.mapper';
import { FindAllTasksService } from './application/usecases/find-all-tasks.service';
import { UpdateTaskService } from './application/usecases/update-task.service';
import { RemoveTaskService } from './application/usecases/remove-task.service';
import { TaskRepository } from './infrastructure/repositories/task.repository';
import { TaskController } from './adapters/controllers/task.controller';
import { TaskEntity } from './infrastructure/persistence-entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [
    { provide: 'ICreateTaskService', useClass: CreateTaskService, },
    { provide: 'IFindTaskByIdService', useClass: FindTaskByIdService, },
    { provide: 'IFindAllTasksService', useClass: FindAllTasksService, },
    { provide: 'IUpdateTaskService', useClass: UpdateTaskService, },
    { provide: 'IRemoveTaskService', useClass: RemoveTaskService, },
    TaskMapper,
    { provide: 'ITaskRepository', useClass: TaskRepository, },
  ],
  exports: [],
})
export class TaskModule { }
