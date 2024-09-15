import { TaskDto } from "../../dtos/task.dto";

export interface IUpdateTaskService {
    update(id: string, task: TaskDto): Promise<void> ;
}