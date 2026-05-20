import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(query?: string): Promise<Product[]> {
    if (query) {
      return this.productsRepository.find({
        where: [
          { name: Like(`%${query}%`) },
          { description: Like(`%${query}%`) }
        ]
      });
    }
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async create(productData: any): Promise<Product> {
    const product = this.productsRepository.create(productData as Product);
    return this.productsRepository.save(product);
  }

  async update(id: number, productData: any): Promise<Product | null> {
    await this.productsRepository.update(id, productData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
