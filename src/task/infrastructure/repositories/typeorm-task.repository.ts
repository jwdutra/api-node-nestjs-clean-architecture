import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/task/domain/entities/task.entity';
import { TaskRepository } from 'src/task/domain/repositories/task.repositorie';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>,
  ) {}

  async save(task: TaskEntity): Promise<TaskEntity> {
    return await this.repository.save(task);
  }

  async find(options: FindOptionsWhere<TaskEntity>): Promise<TaskEntity[]> {
    return await this.repository.find({ where: options });
  }

  async findById(id: string): Promise<TaskEntity> {
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async update(id: string, taskEntity: TaskEntity): Promise<void> {
    await this.repository.update(id, taskEntity);
  }

}