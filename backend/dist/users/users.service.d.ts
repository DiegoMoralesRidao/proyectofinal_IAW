import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOneByUsername(username: string): Promise<User | null>;
    create(userData: any): Promise<User>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    remove(id: number): Promise<void>;
    updatePerfil(id: number, perfil: string): Promise<User | null>;
}
