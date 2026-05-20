import { CartService } from './cart.service';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<import("./cart-item.entity").CartItem[]>;
    addToCart(body: {
        productId: number;
        quantity: number;
    }, req: any): Promise<import("./cart-item.entity").CartItem>;
    updateQuantity(id: string, body: {
        quantity: number;
    }, req: any): Promise<import("./cart-item.entity").CartItem>;
    removeFromCart(id: string, req: any): Promise<void>;
    checkout(req: any): Promise<any>;
}
