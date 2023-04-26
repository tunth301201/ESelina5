import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CartItemDto } from './dto/cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name)
        private cartModel: Model<CartDocument>,
        private productService: ProductService,
    ){}

    async getCartByUserId(userId: string): Promise<Cart> {
        return await this.cartModel.findOne({user_id: userId});
    }

    async addProductToCart(productCartDto: CartItemDto, userId: string): Promise<Cart>{
        const {product_id, quantity} = productCartDto;
        let cart = await this.cartModel.findOne({user_id: userId});
        
        if (!cart){
            cart = new this.cartModel({user_id: userId});
            cart.cart_items.push({
                product_id: new Types.ObjectId(product_id),
                quantity: quantity
            });
        } else {
            const existProduct = cart.cart_items.find(cartItem => cartItem.product_id.toString() == product_id);
            if (existProduct){
                existProduct.quantity += quantity;
            } else {
                cart.cart_items.push({
                    product_id: new Types.ObjectId(product_id),
                    quantity: quantity
                });
            };
        }

        cart.total_price = await this.calculateTotalPriceOfCart(cart.cart_items);
        return cart.save();

    }

    async updateQuantityOfCartItem(productCartDto: CartItemDto, userId: string): Promise<Cart>{
        const {product_id, quantity} = productCartDto;
        let cart = await this.cartModel.findOne({user_id: userId});
        const existProduct = cart.cart_items.find(cartItem => cartItem.product_id.toString() == product_id);
        existProduct.quantity = quantity;

        cart.total_price = await this.calculateTotalPriceOfCart(cart.cart_items);
        return cart.save();
    }

    async deleteCartItem(deleteCartItemId: string, userId: string){
        let cart = await this.cartModel.findOne({user_id: userId});
        const cartItemIndex = cart.cart_items.findIndex(cartItem => cartItem.product_id.toString() == deleteCartItemId);
        if (cartItemIndex === -1){
            throw new NotFoundException('Cart item not found');
        }

        cart.cart_items.splice(cartItemIndex, 1);

        cart.total_price = await this.calculateTotalPriceOfCart(cart.cart_items);
        
        return cart.save();
    }

    async calculateTotalPriceOfCart(cart_items: {product_id: Types.ObjectId;quantity: number;}[]): Promise<number>{
        let totalAmountCart = 0;
        for (const cartItem of cart_items) {
            const newProductCart = await this.productService.getOneProduct(cartItem.product_id.toString());
            console.log(newProductCart)
            if ((newProductCart).discount!=0)
                totalAmountCart += (newProductCart).discount * cartItem.quantity;
            else 
                totalAmountCart += (newProductCart).price * cartItem.quantity;
            
        };
        return totalAmountCart;
    }
}
