import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema( {timestamps: true})
export class Order extends Document{

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ required: true })
    order_number: string;

    @Prop({ required: true })
    delivery_phone: string;

    @Prop({ required: true })
    delivery_address: string;

    @Prop({ type: Number, required: true, default: 0 })
    total_price: number;
    
    @Prop({ required: true, enum: ['J&T', 'ShoppeeExpress', 'GHTK'], default: 'J&T' })
    carrier: string;

    @Prop({ required: true, enum: ['Cash', 'Card'], default: 'Cash' })
    payment_method: string;

    @Prop({ required: true, default:0})
    amount_paid: number;

    @Prop({ required: true, enum: ['waiting', 'shipping', 'delivered', 'return'], default: 'waiting' })
    order_status: string;

    @Prop({ type: [{ product_id: { type: Types.ObjectId, ref: 'Product' }, quantity: Number }], default: [] })
    order_items: { product_id: Types.ObjectId, quantity: number }[];
} 

export const OrderSchema = SchemaFactory.createForClass(Order);
