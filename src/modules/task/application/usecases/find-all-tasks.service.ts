import { Inject, Injectable } from '@nestjs/common';
import { FindAllParameters } from '../interfaces/find-all-parameters.interface';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskDto } from '../dtos/task.dto';
import { IFindAllTasksService } from './interfaces/find-all-tasks.service.interface';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class FindAllTasksService implements IFindAllTasksService {

    constructor(
      @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
      private taskMapper: TaskMapper,
      ) { }
    
      async findAll(params: FindAllParameters): Promise<TaskDto[]> {
    
        const tasksFound = await this.taskRepository.findTask(params);
    
        return tasksFound.map(taskEntity => this.taskMapper.mapEntityToDto(taskEntity));
      }

}
