import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ProductProductRelationshipService } from './product-product-relationship.service';

@Controller('product-product-relationship')
export class ProductProductRelationshipController {
    constructor(private readonly productProductRelationshipService: ProductProductRelationshipService){}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    @Roles('customer')
    async getProductsByItemFiltering(@Body('product_id') product_id:string){
        return await this.productProductRelationshipService.getRecommendProductsByItemBasedFiltering(product_id);
    }
}
