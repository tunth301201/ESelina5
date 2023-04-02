import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'

export type UserProductCollabDocument = UserProductCollab & Document;

@Schema({timestamps: true})
export class UserProductCollab extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: [Types.ObjectId], ref: 'Product', required: true })
    recommended_productIds: Types.ObjectId[];
}

export const UserProductCollabSchema = SchemaFactory.createForClass(UserProductCollab);