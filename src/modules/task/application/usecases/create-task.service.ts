
import { Inject, Injectable } from '@nestjs/common';
import { TaskStatusEnum } from '../../domain/value-objects/task-status.enum';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskDto } from '../dtos/task.dto';
import { ICreateTaskService } from './interfaces/create-task.service.interface';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { TaskEntity } from '../../infrastructure/persistence-entities/task.entity';

@Injectable()
export class CreateTaskService implements ICreateTaskService {

  constructor(
    @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
    private taskMapper: TaskMapper,
  ) { }

  async create(task: TaskDto): Promise<TaskDto> {
    const taskToSave: TaskEntity = {
      ...this.taskMapper.mapDtoToEntity(task),
      status: TaskStatusEnum.TO_DO,
    };

    const createdTask = await this.taskRepository.saveTask(taskToSave);
    return this.taskMapper.mapEntityToDto(createdTask);
  }

}


