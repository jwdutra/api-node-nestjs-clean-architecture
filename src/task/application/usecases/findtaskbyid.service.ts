import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskMapper } from 'src/task/application/mappers/task.mapper';
import { TaskRepository } from 'src/task/infrastructure/repositories/task.repository';

@Injectable()
export class FindTaskByIdService {

  constructor(
    private taskRepository: TaskRepository,
    private taskMapper: TaskMapper,
  ) { }

  async findById(id: string): Promise<TaskEntity> {
    const foundTask = await this.taskRepository.findById(id)

    if (!foundTask) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.taskMapper.mapEntityToDto(foundTask);
  }

}
