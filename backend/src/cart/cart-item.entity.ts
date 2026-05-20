import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.cartItems, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, product => product.cartItems, { onDelete: 'CASCADE' })
  product: Product;

  @Column({ default: 1 })
  quantity: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_pago: Date;
}
