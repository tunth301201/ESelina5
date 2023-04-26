import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreatePromotionDto, UpdatePromotionDto } from './dto/promotion.dto';
import { PromotionService } from './promotion.service';
import { Promotion } from './schemas/promotion.schema';

@Controller('promotion')
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}

    @Get()
    async getAllPromotion(): Promise<Promotion[]> {
        return this.promotionService.getAllPromotion();
    }

    @Get(':id')
    async findOnePromotion(@Param('id') id: string): Promise<Promotion> {
        return this.promotionService.getOnePromotion(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles('seller')
    async createPromotion(@Body() createPromotionDto: CreatePromotionDto): Promise<Promotion> {
        console.log(createPromotionDto);
        return this.promotionService.createPromotion(createPromotionDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put(':id')
    @Roles('seller')
    async updatePromotion(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
        return this.promotionService.updatePromotion(id, updatePromotionDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    @Roles('seller')
    async deletePromotion(@Param('id') id: string): Promise<void> {
        await this.promotionService.deletePromotion(id);
    }
}
