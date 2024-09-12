
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class RemoveTaskService {

  constructor(
    @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
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
