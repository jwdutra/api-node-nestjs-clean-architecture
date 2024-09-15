export interface IRemoveTaskService {
    remove(id: string): Promise<void>;
}