import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post()
  async addToCart(@Body() body: { productId: number, quantity: number }, @Request() req) {
    return this.cartService.addToCart(req.user.id, body.productId, body.quantity || 1);
  }

  @Put(':id')
  async updateQuantity(@Param('id') id: string, @Body() body: { quantity: number }, @Request() req) {
    return this.cartService.updateQuantity(+id, req.user.id, body.quantity);
  }

  @Delete(':id')
  async removeFromCart(@Param('id') id: string, @Request() req) {
    return this.cartService.removeFromCart(+id, req.user.id);
  }

  @Post('checkout')
  async checkout(@Request() req) {
    return this.cartService.checkout(req.user.id);
  }
}
