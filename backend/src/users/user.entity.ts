import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from '../cart/cart-item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @Column({ default: 'user' })
  perfil: string;

  @OneToMany(() => CartItem, cartItem => cartItem.user)
  cartItems: CartItem[];
}
