import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'

export type UserProductSimilarityDocument = UserProductSimilarity & Document;

@Schema()
export class UserProductSimilarity extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    similarUser_id: Types.ObjectId;
    
    @Prop({ type: Number})
    similarity_score: number;
  }
  
  export const UserProductSimilaritySchema = SchemaFactory.createForClass(UserProductSimilarity);