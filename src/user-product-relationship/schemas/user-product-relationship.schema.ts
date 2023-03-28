import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'

export type UserProductRelationshipDocument = UserProductRelationship & Document;

@Schema({timestamps: true})
export class UserProductRelationship extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product_id: Types.ObjectId;

    @Prop({ required: true, enum: [1, 2, 3, 4, 5], default: 5 })
    rating: number;
}

export const UserProductRelationshipSchema = SchemaFactory.createForClass(UserProductRelationship);