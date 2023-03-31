import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { ProductProductRelationshipController } from './product-product-relationship.controller';
import { ProductProductRelationshipService } from './product-product-relationship.service';
import { ProductProductSimilarityController } from './product-product-similarity.controller';
import { ProductProductSimilarityService } from './product-product-similarity.service';
import { ProductProductRelationship, ProductProductRelationshipSchema } from './schemas/product-product-relationship.schema';
import { ProductProductSimilarity, ProductProductSimilaritySchema } from './schemas/product-product-similarity.schema';
import { UserProductRelationshipModule } from '../user-product-relationship/user-product-relationship.module';
import { UserProductRelationshipService } from '../user-product-relationship/user-product-relationship.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ProductProductRelationship.name, schema: ProductProductRelationshipSchema },
    { name: ProductProductSimilarity.name, schema: ProductProductSimilaritySchema },
  ]), AuthModule, ProductModule, UserProductRelationshipModule],
  controllers: [ProductProductRelationshipController, ProductProductSimilarityController],
  providers: [ProductProductRelationshipService, ProductProductSimilarityService]
})
export class ProductProductRelationshipModule {}
