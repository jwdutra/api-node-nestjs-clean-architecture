import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../infrastructure/repositories/task.repository';
import { TaskMapper } from '../mappers/task.mapper';


@Injectable()
export class FindTaskByIdService {

  constructor(
    private taskRepository: TaskRepository,
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
