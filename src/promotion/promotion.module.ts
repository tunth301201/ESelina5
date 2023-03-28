import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/product/schemas/product.schema';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { PromotionProduct, PromotionProductSchema } from './schemas/promotion-product.schema';
import { Promotion, PromotionSchema } from './schemas/promotion.schema';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
      { name: PromotionProduct.name, schema: PromotionProductSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    AuthModule,
    ProductModule
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
