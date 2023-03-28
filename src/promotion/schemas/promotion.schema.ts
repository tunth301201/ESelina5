import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PromotionDocument = Promotion & Document;

@Schema({timestamps: true})
export class Promotion extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  discount: number;

  @Prop({ required: true })
  start_date: Date;

  @Prop({ required: true })
  end_date: Date;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  products: Types.ObjectId[];

}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
