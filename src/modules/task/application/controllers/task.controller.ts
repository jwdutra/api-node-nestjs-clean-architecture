import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { CreateTaskService } from '../usecases/create-task.service';
import { FindTaskByIdService } from '../usecases/find-task-by-id.service';
import { FindAllTasksService } from '../usecases/find-all-tasks.service';
import { UpdateTaskService } from '../usecases/update-task.service';
import { RemoveTaskService } from '../usecases/remove-task.service';
import { AuthGuard } from 'src/infrastructure/auth.guard';
import { TaskRouteParameters } from '../dtos/task-route-parameters.dto';
import { FindAllParameters } from '../interfaces/find-all-parameters.interface';



@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly findTaskByIdService: FindTaskByIdService,
    private readonly findAllTasksService: FindAllTasksService,
    private readonly updateTaskService: UpdateTaskService,
    private readonly removeTaskService: RemoveTaskService,

  ) { }

  @Post()
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    return await this.createTaskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.findTaskByIdService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    return await this.findAllTasksService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
    await this.updateTaskService.update(params.id, task);
  }

  @Delete('/:id')
  remove(@Param() params: TaskRouteParameters,) {
    return this.removeTaskService.remove(params.id);
  }
}
