import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
  ) {}

  async getCart(userId: number): Promise<CartItem[]> {
    return this.cartRepository.find({
      where: { user: { id: userId }, fecha_pago: IsNull() },
      relations: ['product'],
    });
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {
    const existingItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { id: productId }, fecha_pago: IsNull() }
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return this.cartRepository.save(existingItem);
    }

    const newItem = this.cartRepository.create({
      user: { id: userId },
      product: { id: productId },
      quantity
    });
    return this.cartRepository.save(newItem);
  }

  async updateQuantity(id: number, userId: number, quantity: number): Promise<CartItem> {
    const item = await this.cartRepository.findOne({
      where: { id, user: { id: userId }, fecha_pago: IsNull() }
    });
    if (!item) throw new NotFoundException('Item not found in cart');
    item.quantity = quantity;
    return this.cartRepository.save(item);
  }

  async removeFromCart(id: number, userId: number): Promise<void> {
    const result = await this.cartRepository.delete({ id, user: { id: userId }, fecha_pago: IsNull() });
    if (result.affected === 0) throw new NotFoundException('Item not found in cart');
  }

  async checkout(userId: number): Promise<any> {
    const items = await this.getCart(userId);
    if (items.length === 0) throw new BadRequestException('Cart is empty');
    
    const now = new Date();
    for (const item of items) {
      item.fecha_pago = now;
      await this.cartRepository.save(item);
    }

    return { message: 'Pago realizado con éxito', fecha_pago: now };
  }
}
