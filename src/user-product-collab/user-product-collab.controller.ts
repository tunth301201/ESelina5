import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserProductCollabService } from './user-product-collab.service';

@Controller('user-product-collab')
export class UserProductCollabController {
    constructor(private readonly userProductCollabService: UserProductCollabService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    @Roles('customer')
    async getRecommendProductByCollab(@Request() req:any){
        return await this.userProductCollabService.getRecommendProductByCollab(req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/all')
    @Roles('customer')
    async getAllRecommendProductByCollab(@Request() req:any){
        return await this.userProductCollabService.getAllRecommendProductByCollab(req.user.sub);
    }
}
