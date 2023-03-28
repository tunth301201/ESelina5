import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({timestamps: true})
export class Cart extends Document {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: [{ product_id: { type: Types.ObjectId, ref: 'Product' }, quantity: Number }], default: [] })
    cart_items: { product_id: Types.ObjectId, quantity: number }[];

    @Prop({ type: Number, required: true, default: 0 })
    total_price: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);