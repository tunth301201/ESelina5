import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema( {timestamps: true})
export class Feedback extends Document{
    @Prop({ required: true })
    feedback_content: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product_id: Types.ObjectId;

    @Prop({ type: [{ user_id: { type: Types.ObjectId, ref: 'User' }, reply_content: String }], default: [] })
    reply: { user_id: Types.ObjectId, reply_content: string }[];
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);