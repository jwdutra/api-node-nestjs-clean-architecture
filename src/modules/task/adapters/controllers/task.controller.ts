import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/infrastructure/auth.guard';
import { TaskDto } from '../../application/dtos/task.dto';
import { ICreateTaskService } from '../../application/usecases/interfaces/create-task.service.interface';
import { IFindTaskByIdService } from '../../application/usecases/interfaces/find-task-by-id.service.interface';
import { IFindAllTasksService } from '../../application/usecases/interfaces/find-all-tasks.service.interface';
import { IUpdateTaskService } from '../../application/usecases/interfaces/update-task.service.interface';
import { IRemoveTaskService } from '../../application/usecases/interfaces/remove-task.service.interface';
import { FindAllParameters } from '../../application/interfaces/find-all-parameters.interface';
import { TaskRouteParameters } from '../../application/dtos/task-route-parameters.dto';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(
    @Inject('ICreateTaskService') private readonly createTaskService: ICreateTaskService,
    @Inject('IFindTaskByIdService') private readonly findTaskByIdService: IFindTaskByIdService,
    @Inject('IFindAllTasksService') private readonly findAllTasksService: IFindAllTasksService,
    @Inject('IUpdateTaskService') private readonly updateTaskService: IUpdateTaskService,
    @Inject('IRemoveTaskService') private readonly removeTaskService: IRemoveTaskService,
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
