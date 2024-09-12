import { AuthResponseDto } from "../../dtos/auth.dto";

export interface IAuthService {
    signIn(username: string, password: string): Promise<AuthResponseDto>;
}