import { Body, Controller, Delete, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { FeedbackService } from './feedback.service';

@Controller('feedbacks')
@UseGuards(RolesGuard)
export class FeedbackController {
    constructor(private readonly feedbacksService: FeedbackService){}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('/:productId')
    @Roles('customer')
    async sendFeedback(@Body('feedback_content') feedback: string, @Request() req: any, @Param('productId') productId: string){
        return await this.feedbacksService.sendFeedback(feedback, req.user.sub, productId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put('/:productId')
    @Roles('seller', 'customer')
    async replyFeedback(@Body('reply_content') replyFeedback: string, @Request() req: any, @Body('feedback_id') feedbackId: string){
        return await this.feedbacksService.replyFeedback(replyFeedback, req.user.sub, feedbackId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('/:feedbackId')
    @Roles('customer')
    async deleteFeedback(@Param('feedbackId') feedbackId: string, @Request() req: any){
       return await this.feedbacksService.deleteFeedback(feedbackId, req.user.sub);
    }
    

}
