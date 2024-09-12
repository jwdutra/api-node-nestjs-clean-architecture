import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';


@Injectable()
export class FindTaskByIdService {

  constructor(
    @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
    private taskMapper: TaskMapper,
  ) { }

  async findById(id: string): Promise<TaskEntity> {
    const foundTask = await this.taskRepository.findTaskById(id)

    if (!foundTask) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.taskMapper.mapEntityToDto(foundTask);
  }

}
