import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../../domain/entities/task.entity';
import { FindAllParameters, TaskDto } from 'src/task/application/dtos/task.dto';
import { TaskMapper } from 'src/task/application/mappers/task.mapper';
import { TypeOrmTaskRepository } from 'src/task/infrastructure/repositories/typeorm-task.repository';

@Injectable()
export class FindAllTasksService {

    constructor(
      private taskRepository: TypeOrmTaskRepository,
      private taskMapper: TaskMapper,
      ) { }
    
      async findAll(params: FindAllParameters): Promise<TaskDto[]> {
        const searchPrams: FindOptionsWhere<TaskEntity> = {}
    
        if (params.title) {
          searchPrams.title = Like(`%${params.title}%`);
        }
    
        if (params.status) {
          searchPrams.status = Like(`%${params.status}%`);
        }
    
        const tasksFound = await this.taskRepository.find(searchPrams);
    
        return tasksFound.map(taskEntity => this.taskMapper.mapEntityToDto(taskEntity));
      }

}