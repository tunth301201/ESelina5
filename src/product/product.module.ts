import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { PromotionProduct, PromotionProductSchema } from 'src/promotion/schemas/promotion-product.schema';
import { Promotion, PromotionSchema } from 'src/promotion/schemas/promotion.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
    { name: Promotion.name, schema: PromotionSchema },
    { name: PromotionProduct.name, schema: PromotionProductSchema },
  ]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
