import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            perfil: string;
        };
    }>;
    register(user: any): Promise<import("../users/user.entity").User>;
}
