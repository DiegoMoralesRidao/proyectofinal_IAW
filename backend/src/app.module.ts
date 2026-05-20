import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { CartItem } from './cart/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Product, CartItem],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    CartModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
