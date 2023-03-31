import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'

export type ProductProductSimilarityDocument = ProductProductSimilarity & Document;

@Schema()
export class ProductProductSimilarity extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product_id: Types.ObjectId;

    @Prop({ type: [Types.ObjectId], ref: 'Product', required: true })
    similar_product_ids: Types.ObjectId[];
  }
  
  export const ProductProductSimilaritySchema = SchemaFactory.createForClass(ProductProductSimilarity);