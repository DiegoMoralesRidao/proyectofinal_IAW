"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_item_entity_1 = require("./cart-item.entity");
let CartService = class CartService {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async getCart(userId) {
        return this.cartRepository.find({
            where: { user: { id: userId }, fecha_pago: (0, typeorm_2.IsNull)() },
            relations: ['product'],
        });
    }
    async addToCart(userId, productId, quantity) {
        const existingItem = await this.cartRepository.findOne({
            where: { user: { id: userId }, product: { id: productId }, fecha_pago: (0, typeorm_2.IsNull)() }
        });
        if (existingItem) {
            existingItem.quantity += quantity;
            return this.cartRepository.save(existingItem);
        }
        const newItem = this.cartRepository.create({
            user: { id: userId },
            product: { id: productId },
            quantity
        });
        return this.cartRepository.save(newItem);
    }
    async updateQuantity(id, userId, quantity) {
        const item = await this.cartRepository.findOne({
            where: { id, user: { id: userId }, fecha_pago: (0, typeorm_2.IsNull)() }
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found in cart');
        item.quantity = quantity;
        return this.cartRepository.save(item);
    }
    async removeFromCart(id, userId) {
        const result = await this.cartRepository.delete({ id, user: { id: userId }, fecha_pago: (0, typeorm_2.IsNull)() });
        if (result.affected === 0)
            throw new common_1.NotFoundException('Item not found in cart');
    }
    async checkout(userId) {
        const items = await this.getCart(userId);
        if (items.length === 0)
            throw new common_1.BadRequestException('Cart is empty');
        const now = new Date();
        for (const item of items) {
            item.fecha_pago = now;
            await this.cartRepository.save(item);
        }
        return { message: 'Pago realizado con éxito', fecha_pago: now };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map