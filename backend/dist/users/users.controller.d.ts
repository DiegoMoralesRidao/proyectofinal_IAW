import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(req: any): Promise<Omit<import("./user.entity").User, "password">[]>;
    updatePerfil(id: string, body: {
        perfil: string;
    }, req: any): Promise<import("./user.entity").User | null>;
    remove(id: string, req: any): Promise<void>;
}
