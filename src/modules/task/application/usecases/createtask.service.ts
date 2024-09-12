
import { Inject, Injectable } from '@nestjs/common';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskStatusEnum } from '../../domain/value-objects/task-status.enum';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskDto } from '../dtos/task.dto';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class CreateTaskService {

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


