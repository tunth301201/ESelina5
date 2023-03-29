import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserProductRelationship } from './schemas/user-product-relationship.schema';
import { UserProductSimilarity, UserProductSimilarityDocument } from './schemas/user-product-similarity.schema';
import { UserProductRelationshipService } from './user-product-relationship.service';

@Injectable()
export class UserProductSimilarityService {
    constructor(
        @InjectModel(UserProductSimilarity.name)
            private userProductSimilarityModel: Model<UserProductSimilarityDocument>,
        @Inject(forwardRef(() => UserProductRelationshipService))
            private userProductRelationshipService: UserProductRelationshipService,
    ){}


    async calculateUserSimilarities(userId: string): Promise<UserProductSimilarity[]> {
      // Find all the products that the current user has rated
      const userProducts = await this.userProductRelationshipService.getProductsOfCurrentUser(userId);
      const productIds = userProducts.map((userProduct) => userProduct.product_id);

      // Find all the users who have rated the same products as the current user
      const users = await this.userProductRelationshipService.geUsersRatedSameProducts(userId, productIds);

      // Calculate the similarity between the current user and each of the other users
      const similarities = [];
      for (const user of users) {
        const otherUserId = user;
        let similarityScore = await this.calculateCosineSimilarity(userId, otherUserId.toString());

        similarities.push({ user_id: userId, similarUser_id: otherUserId, similarity_score: similarityScore });
      }

      // Save the similarities to the UserProductSimilarity table
      await this.userProductSimilarityModel.deleteMany({ user_id: userId });
      const result = await this.userProductSimilarityModel.insertMany(similarities);

      return result as UserProductSimilarity[];
    }

    async calculateCosineSimilarity(userId: string, otherUserId: string): Promise<number> {
      const userRatings = await this.userProductRelationshipService.getUserProductRatingsByUserId(userId);
      const otherUserRatings = await this.userProductRelationshipService.getUserProductRatingsByUserId(otherUserId);
    
      const userRatingsMap = new Map<string, number>();
      const otherUserRatingsMap = new Map<string, number>();
    
      // create maps of product ratings for both users
      userRatings.forEach((rating) => {
        userRatingsMap.set(rating.product_id.toString(), rating.rating);
      });

    
      otherUserRatings.forEach((rating) => {
        otherUserRatingsMap.set(rating.product_id.toString(), rating.rating);
      });

    
      // calculate cosine similarity between the two users
      let dotProduct = 0;
      let userSquaredSum = 0;
      let otherUserSquaredSum = 0;
    
      userRatingsMap.forEach((rating, productId) => {
        if (otherUserRatingsMap.has(productId)) {
          const otherUserRating = otherUserRatingsMap.get(productId);
          dotProduct += rating * otherUserRating;
        }
        userSquaredSum += rating ** 2;
      });
    
      otherUserRatingsMap.forEach((rating) => {
        otherUserSquaredSum += rating ** 2;
      });

      const denominator = Math.sqrt(userSquaredSum) * Math.sqrt(otherUserSquaredSum);
      if (denominator === 0) {
        return 0;
      }

      let similarityScore = dotProduct/denominator;
      return similarityScore;
    }
    
}
