import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { TaskMapper } from '../mappers/task.mapper';
import { TypeOrmTaskRepository } from 'src/task/infrastructure/repositories/typeorm-task.repository';

@Injectable()
export class UpdateTaskService {

    constructor(
      private taskRepository: TypeOrmTaskRepository,
      private taskMapper: TaskMapper,
    ) { }
    
      async update(id: string, task: TaskDto) {
        const foundTask = await this.taskRepository.findById(id)
    
        if (!foundTask) {
          throw new HttpException(
            `Task with id '${id}' not found`,
            HttpStatus.BAD_REQUEST,
          );
        }
    
        await this.taskRepository.update(id, this.taskMapper.mapDtoToEntity(task));
      }


}
