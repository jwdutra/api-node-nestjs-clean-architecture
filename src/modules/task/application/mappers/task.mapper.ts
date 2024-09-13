import { Injectable } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { TaskEntity } from '../../infrastructure/persistence-entities/task.entity';

@Injectable()
export class TaskMapper {
  mapDtoToEntity(taskDto: TaskDto): TaskEntity {
    return {
      ...taskDto,
      id: undefined,
      status: undefined,
    } as TaskEntity;
  }

  mapEntityToDto(taskEntity: TaskEntity): TaskDto {
    return {
      ...taskEntity,
    } as TaskDto;
  }
}