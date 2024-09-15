import { UserDto } from "../../dtos/user.dto";

export interface IFindByUserNameService {
    findByUserName(username: string): Promise<UserDto | null>;
}