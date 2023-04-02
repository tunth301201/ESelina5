import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'

export type UserProductCollabSimilarityDocument = UserProductCollabSimilarity & Document;

@Schema()
export class UserProductCollabSimilarity extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    other_user_id: Types.ObjectId;

    @Prop({ required: true })
    similarity_score: number;
  }
  
  export const UserProductCollabSimilaritySchema = SchemaFactory.createForClass(UserProductCollabSimilarity);