import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserProductRelationship, UserProductRelationshipSchema } from './schemas/user-product-relationship.schema';
import { UserProductRelationshipController } from './user-product-relationship.controller';
import { UserProductRelationshipService } from './user-product-relationship.service';
import { UserProductSimilarityController } from './user-product-similarity.controller';
import { UserProductSimilarityService } from './user-product-similarity.service';
import { ProductModule } from '../product/product.module';
import { UserProductSimilarity, UserProductSimilaritySchema } from './schemas/user-product-similarity.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserProductRelationship.name, schema: UserProductRelationshipSchema },
    { name: UserProductSimilarity.name, schema: UserProductSimilaritySchema },
  ]), AuthModule, ProductModule],
  controllers: [UserProductRelationshipController, UserProductSimilarityController],
  providers: [UserProductRelationshipService, UserProductSimilarityService],
  exports: [UserProductRelationshipService, UserProductSimilarityService],
})
export class UserProductRelationshipModule {}
