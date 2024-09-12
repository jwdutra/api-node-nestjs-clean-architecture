
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskStatusEnum } from '../../domain/value-objects/task-status.enum';
import { TaskRepository } from '../../infrastructure/repositories/task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskDto } from '../dtos/task.dto';

@Injectable()
export class CreateTaskService {

  constructor(
    private taskRepository: TaskRepository,
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


