import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
export declare class CartItem {
    id: number;
    user: User;
    product: Product;
    quantity: number;
    fecha_pago: Date;
}
