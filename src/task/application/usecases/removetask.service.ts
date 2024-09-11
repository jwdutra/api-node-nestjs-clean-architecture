
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskRepository } from 'src/task/infrastructure/repositories/task.repository';

@Injectable()
export class RemoveTaskService {

  constructor(
    private taskRepository: TaskRepository,
  ) { }

  async remove(id: string) {

    const result = await this.taskRepository.delete(id)

    if (!result.affected) {
      throw new HttpException(
        `Task with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

}
