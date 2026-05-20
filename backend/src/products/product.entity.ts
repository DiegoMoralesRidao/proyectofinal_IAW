import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from '../cart/cart-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => CartItem, cartItem => cartItem.product)
  cartItems: CartItem[];
}
