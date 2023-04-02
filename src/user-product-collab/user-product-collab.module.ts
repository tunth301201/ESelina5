import { Module } from '@nestjs/common';
import { UserProductCollabController } from './user-product-collab.controller';
import { UserProductCollabService } from './user-product-collab.service';
import { UserProductRelationshipModule } from '../user-product-relationship/user-product-relationship.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProductCollab, UserProductCollabSchema } from './schemas/user-product-collab.schema';
import { UserProductCollabSimilarity, UserProductCollabSimilaritySchema } from './schemas/user-product-collab-similarity.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserProductCollab.name, schema: UserProductCollabSchema },
    { name: UserProductCollabSimilarity.name, schema: UserProductCollabSimilaritySchema },
  ]),AuthModule, ProductModule, UserProductRelationshipModule],
  controllers: [UserProductCollabController],
  providers: [UserProductCollabService]
})
export class UserProductCollabModule {}
