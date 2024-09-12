
export interface IAuthRepository {
    jwtSign(payload: any): JwtSignResponse;
    bcryptCompare(password: string, hash: string): boolean 
}
