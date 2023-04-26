import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ProductProductRelationshipService } from './product-product-relationship.service';

@Controller('product-product-relationship')
export class ProductProductRelationshipController {
    constructor(private readonly productProductRelationshipService: ProductProductRelationshipService){}

  
    @Get('/:productId')
    async getProductsByItemFiltering(@Param('productId') productId: string){
        return await this.productProductRelationshipService.getRecommendProductsByItemBasedFiltering(productId);
    }
}
