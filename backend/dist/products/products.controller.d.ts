import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    findAll(query: string): Promise<import("./product.entity").Product[]>;
    findOne(id: string): Promise<import("./product.entity").Product | null>;
    create(body: any, req: any): Promise<import("./product.entity").Product>;
    update(id: string, body: any, req: any): Promise<import("./product.entity").Product | null>;
    remove(id: string, req: any): Promise<void>;
}
