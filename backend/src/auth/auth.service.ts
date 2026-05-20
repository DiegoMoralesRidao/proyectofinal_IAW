import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    const foundUser = await this.usersService.findOneByUsername(user.username);
    if (!foundUser || !foundUser.password) {
      throw new UnauthorizedException('User not found or invalid credentials');
    }
    const isMatch = await bcrypt.compare(user.password, foundUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: foundUser.username, sub: foundUser.id, perfil: foundUser.perfil };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: foundUser.id,
        username: foundUser.username,
        perfil: foundUser.perfil
      }
    };
  }
  
  async register(user: any) {
    return this.usersService.create(user);
  }
}
