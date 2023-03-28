import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PromotionProductDocument = PromotionProduct & Document;

@Schema({timestamps: true})
export class PromotionProduct extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Promotion', required: true })
  promotion_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;
}

export const PromotionProductSchema = SchemaFactory.createForClass(PromotionProduct);
