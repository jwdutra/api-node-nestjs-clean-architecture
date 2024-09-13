import { DeleteResult, FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../../domain/entities/task.entity';
import { ITaskRepository } from '../../application/repositories/task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>,
  ) {}

  async saveTask(task: TaskEntity): Promise<TaskEntity> {
    return await this.repository.save(task);
  }

  async findTask(params: FindOptionsWhere<TaskEntity>): Promise<TaskEntity[]> {

    const searchPrams: FindOptionsWhere<TaskEntity> = {}
    
    if (params.title) {
      searchPrams.title = Like(`%${params.title}%`);
    }

    if (params.status) {
      searchPrams.status = Like(`%${params.status}%`);
    }

    return await this.repository.find({ where: params });
  }

  async findTaskById(id: string): Promise<TaskEntity> {
    return await this.repository.findOne({ where: { id } });
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async updateTask(id: string, taskEntity: TaskEntity): Promise<void> {
    await this.repository.update(id, taskEntity);
  }

}