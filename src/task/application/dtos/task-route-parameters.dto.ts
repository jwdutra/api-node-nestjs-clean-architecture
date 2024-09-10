import { IsUUID } from 'class-validator';

export class TaskRouteParameters {
    @IsUUID()
    id: string;
  }