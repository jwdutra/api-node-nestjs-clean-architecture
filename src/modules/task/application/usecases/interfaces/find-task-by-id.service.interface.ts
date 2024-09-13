import { TaskEntity } from "src/modules/task/infrastructure/persistence-entities/task.entity";

export interface IFindTaskByIdService {
    findById(id: string): Promise<TaskEntity>;
}