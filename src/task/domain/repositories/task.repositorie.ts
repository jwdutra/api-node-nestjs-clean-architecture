import { DeleteResult, FindOptionsWhere } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';

export interface TaskRepository {
  save(task: TaskEntity): Promise<TaskEntity>;
  find(options: FindOptionsWhere<TaskEntity>): Promise<TaskEntity[]>;
  findById(id: string): Promise<TaskEntity>
  delete(id: string): Promise<DeleteResult> 
  update(id: string ,taskEntity: TaskEntity): Promise<void> ;
}