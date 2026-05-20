import { CartItem } from '../cart/cart-item.entity';
export declare class User {
    id: number;
    username: string;
    password?: string;
    perfil: string;
    cartItems: CartItem[];
}
