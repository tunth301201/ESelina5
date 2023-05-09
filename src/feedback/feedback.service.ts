import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectModel(Feedback.name)
        private feedbackModel: Model<FeedbackDocument>,
    ){}

    async getAllFeedbackByProductId(productId: string): Promise<Feedback[]> {
        return await this.feedbackModel.find({product_id: productId}).populate('user_id');
    }

    async getOneFeedbackById(feedbackId: string): Promise<Feedback> {
        return await this.feedbackModel.findById(feedbackId).populate('user_id');
    }

    async sendFeedback( newFeedback: string, userId: string, productId: string): Promise<Feedback>{
        let feedback = await this.feedbackModel.findOne({user_id: userId, product_id: productId});
        if (feedback) {
            feedback.feedback_content = newFeedback;
        }
        else {
            feedback = new this.feedbackModel({
                feedback_content: newFeedback,
                user_id: userId,
                product_id: productId,
            });
        }
        
        return await feedback.save();
    }

    async replyFeedback( replyFeedback: string, userId: string, feedbackId: string): Promise<Feedback>{
        let feedback = await this.feedbackModel.findById(feedbackId);
        feedback.reply.push({
            user_id: new Types.ObjectId(userId),
            reply_content: replyFeedback
        });
        return feedback.save();
    }

    async deleteFeedback (feedbackId: string, userId?: string): Promise<any>{
        const feedback = await this.feedbackModel.findById(feedbackId);
        if ((userId && feedback.user_id.toString() == userId) || !userId) {
            return this.feedbackModel.findByIdAndDelete(feedbackId).exec();
        }
        return null;
    }
}
