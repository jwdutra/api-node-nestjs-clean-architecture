import { TaskEntity } from "src/modules/task/domain/entities/task.entity";

export interface IFindTaskByIdService {
    findById(id: string): Promise<TaskEntity>;
}