import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UserProductRelationshipModule } from './user-product-relationship/user-product-relationship.module';
import { ProductProductRelationshipModule } from './product-product-relationship/product-product-relationship.module';
import { UserProductCollabModule } from './user-product-collab/user-product-collab.module';
import 'dotenv/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule, AuthModule, SharedModule, CategoryModule, ProductModule, PromotionModule, OrderModule, CartModule, FeedbackModule, UserProductRelationshipModule, ProductProductRelationshipModule, UserProductCollabModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
