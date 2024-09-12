import { Injectable } from '@nestjs/common';
import { FindAllParameters } from '../interfaces/find-all-parameters.interface';
import { TaskRepository } from '../../infrastructure/repositories/task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskDto } from '../dtos/task.dto';

@Injectable()
export class FindAllTasksService {

    constructor(
      private taskRepository: TaskRepository,
      private taskMapper: TaskMapper,
      ) { }
    
      async findAll(params: FindAllParameters): Promise<TaskDto[]> {
    
        const tasksFound = await this.taskRepository.findTask(params);
    
        return tasksFound.map(taskEntity => this.taskMapper.mapEntityToDto(taskEntity));
      }

}
