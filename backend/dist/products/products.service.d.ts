import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll(query?: string): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    create(productData: any): Promise<Product>;
    update(id: number, productData: any): Promise<Product | null>;
    remove(id: number): Promise<void>;
}
