import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
export declare class CartService {
    private cartRepository;
    constructor(cartRepository: Repository<CartItem>);
    getCart(userId: number): Promise<CartItem[]>;
    addToCart(userId: number, productId: number, quantity: number): Promise<CartItem>;
    updateQuantity(id: number, userId: number, quantity: number): Promise<CartItem>;
    removeFromCart(id: number, userId: number): Promise<void>;
    checkout(userId: number): Promise<any>;
}
