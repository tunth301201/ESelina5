import { Body, Controller, Post, UseGuards, Request, Delete, Param, Put, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles('customer')
    async createOrder(@Body() createOrderDto: OrderDto, @Request() req: any) {
        return this.orderService.createOrder(createOrderDto, req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    @Roles('seller')
    async deleteOrder(@Param('id') id: string) {
        return this.orderService.deleteOrder(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put('/updateOrderStatus/:idOrder')
    @Roles('seller')
    async updateOrderStatus(@Param('idOrder') idOrder: string){
        return await this.orderService.updateOrderStatus(idOrder);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    @Roles('seller')
    async getAllOrders(){
        return await this.orderService.getAllOrders();
       
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/listUserOrders')
    @Roles('customer')
    async getOrdersByUserId(@Request() req: any){
        return this.orderService.getOrdersByUserId(req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/orderItems/:orderId')
    @Roles('customer', 'seller')
    async getOrdersByOrderId(@Param('orderId') orderId: string){
        return this.orderService.getOrdersById(orderId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/search')
    @Roles('seller')
    async searchOrderByOrderNumber(@Query('orderNumber') orderNumber: string, @Request() req: any){
        return this.orderService.searchOrderByOrderNumber(orderNumber);
 
    }

    @Get('/check-exist-in-orders/:id')
    async checkExistProductInOrders(@Param('id') productId: string): Promise<Boolean> {
        return this.orderService.checkExistProductInOrders(productId);
    }

    @Get('/order/totalProfit')
    async getTotalProfit(){
        return await this.orderService.totalProfit();
    }

    @Get('/order/totalByMonth')
    async getGroupByMonth(){
        return await this.orderService.groupSaleByMonths();
    }

    @Get('/order/sixLastestOrders')
    async getSixLastestOrders(){
        return await this.orderService.sixLatestOrders();
    }
}
