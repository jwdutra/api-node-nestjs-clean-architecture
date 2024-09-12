import { TaskEntity } from '../../domain/entities/task.entity';
import { Injectable } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';

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