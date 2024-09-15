import { TaskDto } from "../../dtos/task.dto";
import { FindAllParameters } from "../../interfaces/find-all-parameters.interface";

export interface IFindAllTasksService {
    findAll(params: FindAllParameters): Promise<TaskDto[]> ;
}