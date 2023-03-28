import { Body, Controller, Post, UseGuards, Request, Put, Delete, Param, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CartService } from './cart.service';
import { CartItemDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    @Roles('customer')
    async getCartByUserId(@Request() req: any) {
        return this.cartService.getCartByUserId(req.user.sub);
    }


    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles('customer')
    async addProductToCart(@Body() addCartItem: CartItemDto, @Request() req: any) {
        return this.cartService.addProductToCart(addCartItem, req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put()
    @Roles('customer')
    async updateQuantityOfCartItem(@Body() updateCartItem: CartItemDto, @Request() req: any) {
        return this.cartService.updateQuantityOfCartItem(updateCartItem, req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('/:idCartItem')
    @Roles('customer')
    async deleteCartItem(@Param('idCartItem') idCartItem: string, @Request() req: any) {
        return this.cartService.deleteCartItem(idCartItem, req.user.sub);
    }
}
