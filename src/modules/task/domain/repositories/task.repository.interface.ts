import { DeleteResult, FindOptionsWhere } from 'typeorm';
import { TaskEntity } from '../../infrastructure/persistence-entities/task.entity';

export interface ITaskRepository {
  saveTask(task: TaskEntity): Promise<TaskEntity>;
  findTask(options: FindOptionsWhere<TaskEntity>): Promise<TaskEntity[]>;
  findTaskById(id: string): Promise<TaskEntity>
  deleteTask(id: string): Promise<DeleteResult> 
  updateTask(id: string ,taskEntity: TaskEntity): Promise<void> ;
}