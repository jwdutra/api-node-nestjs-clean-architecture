
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskDto } from 'src/task/application/dtos/task.dto';
import { TaskMapper } from 'src/task/application/mappers/task.mapper';
import { TaskStatusEnum } from '../../domain/value-objects/task-status.enum';
import { TaskRepository } from 'src/task/infrastructure/repositories/task.repository';

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

    const createdTask = await this.taskRepository.save(taskToSave);
    return this.taskMapper.mapEntityToDto(createdTask);
  }

}


