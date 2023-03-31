import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'

export type ProductProductRelationshipDocument = ProductProductRelationship & Document;

@Schema({timestamps: true})
export class ProductProductRelationship extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product_id_1: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product_id_2: Types.ObjectId;

    @Prop({ required: true })
    correlation: number;
}

export const ProductProductRelationshipSchema = SchemaFactory.createForClass(ProductProductRelationship);