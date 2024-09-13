
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRemoveTaskService } from './interfaces/remove-task.service.interface';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class RemoveTaskService implements IRemoveTaskService {

  constructor(
    @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
  ) { }

  async remove(id: string): Promise<void> {

    const result = await this.taskRepository.deleteTask(id)

    if (!result.affected) {
      throw new HttpException(
        `Task with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

}
