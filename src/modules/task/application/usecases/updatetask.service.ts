import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { TaskMapper } from '../mappers/task.mapper';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class UpdateTaskService {

    constructor(
      @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
      private taskMapper: TaskMapper,
    ) { }
    
      async update(id: string, task: TaskDto) {
        const foundTask = await this.taskRepository.findTaskById(id)
    
        if (!foundTask) {
          throw new HttpException(
            `Task with id '${id}' not found`,
            HttpStatus.BAD_REQUEST,
          );
        }
    
        await this.taskRepository.updateTask(id, this.taskMapper.mapDtoToEntity(task));
      }


}
