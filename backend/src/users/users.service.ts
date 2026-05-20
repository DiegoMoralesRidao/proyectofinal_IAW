import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(userData: any): Promise<User> {
    const existing = await this.findOneByUsername(userData.username);
    if (existing) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.usersRepository.create({
      username: userData.username,
      password: hashedPassword,
      perfil: 'user',
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    return users.map(user => {
      const { password, ...result } = user;
      return result;
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updatePerfil(id: number, perfil: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      user.perfil = perfil;
      return this.usersRepository.save(user);
    }
    return null;
  }
}
