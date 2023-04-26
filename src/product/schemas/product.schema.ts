import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({timestamps: true})
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ required: true })
  images: [{ data: Buffer, contentType: String }];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category_id: Types.ObjectId;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
