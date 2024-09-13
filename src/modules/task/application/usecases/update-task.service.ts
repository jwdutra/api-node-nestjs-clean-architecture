import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { TaskMapper } from '../mappers/task.mapper';
import { IUpdateTaskService } from './interfaces/update-task.service.interface';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class UpdateTaskService implements IUpdateTaskService {

    constructor(
      @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
      private taskMapper: TaskMapper,
    ) { }
    
      async update(id: string, task: TaskDto): Promise<void>  {
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
