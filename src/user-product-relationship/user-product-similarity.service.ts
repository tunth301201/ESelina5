import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    async calculateUserProductSimilarity(userId: string): Promise<UserProductSimilarity[]>{
        // Get all user-product ratings for the current user
        const userProductRatings = await this.userProductRelationshipService.getUserProductRatingsByUserId(userId);

        // Get a list of all users who have rated the same products as the current user
        const userProductRaters = await this.userProductRelationshipService.getUsersWhoRatedSameProducts(userId);

        // Calculate the cosine similarity between the current user and each of the other users
        for (const userProductRater of userProductRaters) {
            if (userProductRater.user_id.toString() !== userId) {
            const sharedProductRatings = await this.userProductRelationshipService.getSharedProductRatings(userId, userProductRater.user_id.toString());


            // console.log("product duoc rate boi nguoi khac==="+sharedProductRatings)

            const similarityScore = await this.cosineSimilarity(userProductRatings, sharedProductRatings);
            console.log("do tuong dong===="+similarityScore);

            // Save the similarity score in the UserProductSimilarity table
            await this.userProductSimilarityModel.create({
                user_id: userId,
                similarUser_id: userProductRater.user_id,
                similarity_score: similarityScore
            });
            }
        } 

        return await this.userProductSimilarityModel.find({user_id: userId});
    }

    async cosineSimilarity(a: UserProductRelationship[], b: UserProductRelationship[]): Promise<number> {
        // create a map of product IDs to ratings for each user
        const aMap = new Map<string, number>();
        const bMap = new Map<string, number>();
        for (const rating of a) {
          aMap.set(rating.product_id.toString(), rating.rating);
        }
        for (const rating of b) {
          bMap.set(rating.product_id.toString(), rating.rating);
        }
      
        // get the set of common product IDs
        const commonIds = new Set([...aMap.keys()].filter(id => bMap.has(id)));
      
        // calculate the dot product and magnitudes
        let dotProduct = 0;
        let aMagnitude = 0;
        let bMagnitude = 0;
        for (const id of commonIds) {
          const aRating = aMap.get(id) as number;
          const bRating = bMap.get(id) as number;
          dotProduct += aRating * bRating;
          aMagnitude += aRating ** 2;
          bMagnitude += bRating ** 2;
        }
      
        // calculate the cosine similarity
        const denominator = Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude);
        return denominator === 0 ? 0 : dotProduct / denominator;
      }
}
