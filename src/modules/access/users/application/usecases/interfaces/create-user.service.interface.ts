import { UserDto } from "../../dtos/user.dto";
import { CreateUserResponse } from "../../interfaces/create-user-response.interface";

export interface ICreateUserService {
    createUser(newUser: UserDto): Promise<CreateUserResponse>;
}