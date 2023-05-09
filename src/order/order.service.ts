import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { OrderDto } from './dto/order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) 
        private orderModel: Model<OrderDocument>,
        private cartService: CartService,
      ) {}

      async createOrder(createOrderDto: OrderDto, userId: string){
        const userCart = await this.cartService.getCartByUserId(userId);

        const order_number = await this.generateOrderNumber();

        const { delivery_phone, delivery_address, carrier, payment_method} = createOrderDto;

        let amount_paid = 0;
        if (payment_method === 'Card'){
          amount_paid = userCart.total_price;
        }

        const order = new this.orderModel({
            user_id: userId,
            order_number: order_number,
            delivery_phone : delivery_phone,
            delivery_address: delivery_address,
            total_price: userCart.total_price,
            carrier: carrier,
            payment_method: payment_method,
            amount_paid: amount_paid,
            order_items: userCart.cart_items,
          });

        await this.cartService.deleteCartByUserId(userId);
      
          return (await order.save()).populate('user_id');
      }

      async deleteOrder(id: string): Promise<Boolean> {
        const order = await this.orderModel.findById(id);
        if (order.order_status === "waiting"){
          await this.orderModel.findByIdAndDelete(id);
          return true;
        }
        return false;
        
      }

      async updateOrderStatus(id: string): Promise<Order> {
        const updateOrder = await this.orderModel.findById(id);
        updateOrder.order_status = "shipping";
        return updateOrder.save();
      }

      async getAllOrders(): Promise<Order[]> {
        return this.orderModel.find().populate('user_id').exec();
      }

      async getOrdersByUserId(userId: string): Promise<Order[]> {
        return this.orderModel.find({user_id: userId}).populate('user_id').exec();
      }

      async getOrdersById(orderId: string): Promise<Order> {
        return this.orderModel.findById(orderId).populate('user_id').exec();
      }
      
      async searchOrderByOrderNumber(orderNumber: string): Promise<Order> {
        return await this.orderModel.findOne({ order_number: orderNumber }).exec();
      }


      async checkExistProductInOrders(productId: string): Promise<Boolean> {
        const order = await this.orderModel.findOne({
          order_items: { $elemMatch: { product_id: productId } }
        });
        return Boolean(order);
      }
      

    async generateOrderNumber(): Promise<string> {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let orderNumber = '';
        for (let i = 0; i < 4; i++) {
            orderNumber += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 4; i++) {
            orderNumber += Math.floor(Math.random() * 10);
        }
        return orderNumber;
    }

    async deleteOrdersByUserId(userId: string) {
      await this.cartService.deleteCartByUserId(userId);
      return await this.orderModel.deleteMany({ user_id: userId }).exec();
    }
}
