import { Controller, Get, Put, Param, Body, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    if (req.user.perfil !== 'admin') {
      throw new UnauthorizedException('Only admin can view all users');
    }
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/perfil')
  async updatePerfil(@Param('id') id: string, @Body() body: { perfil: string }, @Request() req) {
    if (req.user.perfil !== 'admin') {
      throw new UnauthorizedException('Only admin can change roles');
    }
    return this.usersService.updatePerfil(+id, body.perfil);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.perfil !== 'admin') {
      throw new UnauthorizedException('Only admin can delete users');
    }
    return this.usersService.remove(+id);
  }
}
