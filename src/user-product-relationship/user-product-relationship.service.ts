import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { UserProductRelationship, UserProductRelationshipDocument } from './schemas/user-product-relationship.schema';
import { ProductService } from '../product/product.service';
import { UserProductSimilarityService } from './user-product-similarity.service';

@Injectable()
export class UserProductRelationshipService {
    constructor(
        @InjectModel(UserProductRelationship.name)
            private userProductRelationshipModel: Model<UserProductRelationshipDocument>,
            private productService: ProductService,
            private userProductSimilarityService: UserProductSimilarityService,
    ){}

    async ratingProduct(productId: string, rating: number, userId: string): Promise<UserProductRelationship>{
        let ratingProduct = await this.userProductRelationshipModel.findOne({user_id: userId, product_id: productId});
        if (ratingProduct){
            ratingProduct.rating = rating;
        }
        else {
            ratingProduct = new this.userProductRelationshipModel({
                product_id: productId,
                rating: rating,
                user_id: userId
            });
        }
        
        return await ratingProduct.save();
    }

    async getUserRatings(userId: string): Promise<UserProductRelationship[]>{
        return await this.userProductRelationshipModel.find({user_id:userId});
    }

    async calculateProductRating(productId: string): Promise<number> {
        const ratings = await this.userProductRelationshipModel.find({ product_id: productId }).select('rating');
      
        let totalRating = 0;
        ratings.forEach((rating) => {
          totalRating += rating.rating;
        });
      
        const avgRating = totalRating / ratings.length;
        return avgRating;
      }

    async getUserProductRatingsByUserId(userId: string): Promise<UserProductRelationship[]>{
        return await this.userProductRelationshipModel.find({ user_id: userId });
    }

    async getUsersWhoRatedSameProducts(userId: string): Promise<string[]> {
        const userProductRatings = await this.getUserProductRatingsByUserId(userId);
        const productIds = userProductRatings.map((rating) => rating.product_id);
        const users = await this.userProductRelationshipModel.distinct('user_id', { product_id: { $in: productIds }, user_id: { $ne: userId } }).exec();
        return users;
      }
      

    async getSharedProductRatings(userId: string, otherUserId: string): Promise<UserProductRelationship[]> {
        const userProductRatings = await this.getUserProductRatingsByUserId(userId);
        const otherUserProductRatings = await this.getUserProductRatingsByUserId(otherUserId);
        const sharedProductIds = userProductRatings.filter((rating) => {
          return otherUserProductRatings.some((otherRating) => otherRating.product_id === rating.product_id);
        }).map((rating) => rating.product_id);
        const sharedProductRatings = userProductRatings.filter((rating) => sharedProductIds.includes(rating.product_id));
        return sharedProductRatings;
      }
      

    async getRecommendationProduct(userId: string): Promise<Product[]>{
        const k = 5;
        const userRatings = await this.userProductRelationshipModel.find({user_id:userId});
        const allProducts = await this.productService.getAllProducts();
        const userSimilarities = await this.userProductSimilarityService.calculateUserSimilarities(userId);
        userSimilarities.sort((a, b) => b.similarity_score - a.similarity_score);
        const topKUsers = userSimilarities.slice(0, k);

        const productRatings = new Map<string, number>();
        for (const rating of userRatings) {
            const productId = rating.product_id;
            const ratingValue = rating.rating;
            if (productRatings.has(productId.toString())) {
                const currentValue = productRatings.get(productId.toString());
                productRatings.set(productId.toString(), currentValue + ratingValue);
            } else {
                productRatings.set(productId.toString(), ratingValue);
            }
        }

        for (const productId of productRatings.keys()) {
            const ratingSum = productRatings.get(productId);
            const ratingCount = userRatings.filter(rating => rating.product_id.toString() === productId).length;
            productRatings.set(productId, ratingSum / ratingCount);
          }
        
        const predictedRatings = new Map<string, number>();
        for (const product of allProducts) {
            const productId = product.id;
            if (!productRatings.has(productId)) {
                let numerator = 0;
                let denominator = 0;
            for (const user of topKUsers) {
                const similarityScore = user.similarity_score;
                const userRatings = await this.getUserRatings(user.user_id.toString());
                const rating = userRatings.find(rating => rating.product_id.toString() === productId);
                if (rating) {
                const ratingValue = rating.rating;
                const userAverageRating = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;
                numerator += similarityScore * (ratingValue - userAverageRating);
                denominator += similarityScore;
                }
            }
            const predictedRating = denominator === 0 ? 0 : numerator / denominator;
            predictedRatings.set(productId, predictedRating);
            }
        }

        // const n = 10;
        const recommendedProducts = Array.from(predictedRatings.entries())
            .sort((a, b) => b[1] - a[1])
            // .slice(0, n)
            .map(([productId]) => allProducts.find(product => product.id === productId));
        
        return recommendedProducts;
    }
      
      // Find all the products that the current user has rated
      async getProductsOfCurrentUser(userId: string): Promise<UserProductRelationship[]>{
        return await this.userProductRelationshipModel.find({ user_id: userId }).select('product_id').lean();
      }

      // Find all the users who have rated the same products as the current user
      async geUsersRatedSameProducts(userId: string, productIds: Types.ObjectId[]): Promise<UserProductRelationship[]>{
        return await this.userProductRelationshipModel.find({ product_id: { $in: productIds }, user_id: { $ne: userId } })
        .select('user_id')
        .distinct('user_id')
        .lean();
      }

      // Get all users who have rated the specified product
      async getUsersWhoRatedProduct(productId: string): Promise<string[]> {
        return await this.userProductRelationshipModel.distinct('user_id', { product_id: productId }).lean();
      }

      // Calculate the average rating for the specified product
      async calculateAverageRatingsProduct(productId: string): Promise<number>{
        const productRatings = await this.userProductRelationshipModel.find({ product_id: productId }).select('rating').lean();
        const productAvgRating = productRatings.reduce((sum, { rating }) => sum + rating, 0) / productRatings.length;
        return productAvgRating;
      }

      // Get all users who have rated both the specified product and the other product
      async getUsersRatedProductAndOtherProduct(productId: string, users: string[], otherProductId: string): Promise<string[]>{
        return await this.userProductRelationshipModel.distinct('user_id', {
            $and: [{ product_id: productId }, { user_id: { $in: users } }, { user_id: { $in: await this.userProductRelationshipModel.distinct('user_id', { product_id: otherProductId }).lean() } }]
          }).lean();
      }

    //   Get rating of user-product
    async getUserProductRating(user: string, productId: string): Promise<UserProductRelationship>{
        return await this.userProductRelationshipModel.findOne({ user_id: user, product_id: productId }).select('rating').lean();
    }

    // 
    async getUserAvgRating(user: string): Promise<number>{
        const result = await this.userProductRelationshipModel.aggregate([
            { $match: { user_id: user } },
            { $group: { _id: null, avgRating: { $avg: '$rating' } } },
            { $project: { _id: 0, avgRating: 1 } }
          ]).exec();
          return result[0]?.avgRating || 0;
    }







// Lấy danh sách các sản phẩm khác (nếu có) đã được đánh giá bởi người dùng
    async userRatedProducts(productId: string): Promise<string[]> {
      return await this.userProductRelationshipModel
        .find({ product_id: { $ne: productId } })
        .distinct('product_id');
    }

// Lấy danh sách tất cả người dùng đã đánh giá sản phẩm được chỉ định
    async users(productId: string): Promise<string[]> {
        return await this.userProductRelationshipModel
        .find({ product_id: productId })
        .distinct('user_id');
    }      

// Lấy danh sách tất cả người dùng đã đánh giá cả sản phẩm được chỉ định và sản phẩm khác
    async commonUsers(productId: string, otherProductId: string): Promise<string[]> {
        return await this.userProductRelationshipModel
          .find({ product_id: { $in: [productId, otherProductId] } })
          .distinct('user_id');
    }

// Lấy danh sách đánh giá của người dùng cho cả sản phẩm được chỉ định và sản phẩm khác
    async userRatings(productId: string, otherProductId: string, commonUsers: string[]): Promise<UserProductRelationship[]> {
      return await this.userProductRelationshipModel.find({
          user_id: { $in: commonUsers },
          product_id: { $in: [productId, otherProductId] },
        });
      }


  

// COLLAB FILTERING
      async getRatedProductsByUser(userId: string): Promise<UserProductRelationship[]> {
        return this.userProductRelationshipModel.find({ user_id: userId }).exec();
      }

      async getRatedProductsByUsers(userIds: string[]): Promise<UserProductRelationship[]> {
        return this.userProductRelationshipModel.find({ user_id: { $in: userIds } }).exec();
      }

      async getUserIdsByRatedProducts(ratedProducts: UserProductRelationship[]): Promise<UserProductRelationship[]> {
        const userIds: UserProductRelationship[] = [];
        for (const ratedProduct of ratedProducts) {
          const users = await this.userProductRelationshipModel
            .find({ product_id: ratedProduct.product_id })
            .distinct('user_id');
          for (const user of users) {
            const userProductRelationship = await this.userProductRelationshipModel.findOne({
              user_id: user,
              product_id: ratedProduct.product_id,
            });
            if (userProductRelationship) {
              userIds.push(userProductRelationship);
            }
          }
        }
        return userIds;
      }
      

      async getUnratedProductsByUser(other_userId: string, current_ratedProducts: UserProductRelationship[]): Promise<UserProductRelationship[]> {
      
        const ratedProductIds = current_ratedProducts.map(p => p.product_id);

        // Lấy ra danh sách sản phẩm chưa được đánh giá bởi người dùng hiện tại
        const unratedProducts = await this.userProductRelationshipModel
          .find({ 
            user_id: other_userId,
            product_id: { $nin: ratedProductIds },
            rating: { $ne: null }
          })
          .exec();;

        return unratedProducts;
      }
      
}
