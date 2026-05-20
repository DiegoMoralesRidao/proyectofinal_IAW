import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            perfil: string;
        };
    }>;
    register(body: any): Promise<import("../users/user.entity").User>;
}
