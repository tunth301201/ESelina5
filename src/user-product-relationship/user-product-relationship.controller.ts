import { Controller, Get, UseGuards, Request, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserProductRelationshipService } from './user-product-relationship.service';

@Controller('user-product-relationship')
export class UserProductRelationshipController {
    constructor(private readonly userProductRelationshipService: UserProductRelationshipService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles('customer')
    async ratingProduct(@Body('product_id') product_id: string, @Body('rating') rating: number, @Request() req:any){
        return await this.userProductRelationshipService.ratingProduct(product_id, rating, req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    @Roles('customer')
    async getProductsByUserFiltering(@Request() req:any){
        return await this.userProductRelationshipService.getProductsByUserFiltering(req.user.sub);
    }

}
