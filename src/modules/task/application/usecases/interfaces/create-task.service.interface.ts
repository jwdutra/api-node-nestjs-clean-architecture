import { TaskDto } from "../../dtos/task.dto";

export interface ICreateTaskService {
    create(task: TaskDto): Promise<TaskDto>;
}