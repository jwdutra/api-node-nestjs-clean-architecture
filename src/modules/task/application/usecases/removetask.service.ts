
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskRepository } from '../../infrastructure/repositories/task.repository';

@Injectable()
export class RemoveTaskService {

  constructor(
    private taskRepository: TaskRepository,
  ) { }

  async remove(id: string) {

    const result = await this.taskRepository.deleteTask(id)

    if (!result.affected) {
      throw new HttpException(
        `Task with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

}