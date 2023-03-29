import { Injectable } from '@nestjs/common';
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
      
    // async getUsersWhoRatedSameProducts(userId: string): Promise<UserProductRelationship[]> {
    //     const userRatings = await this.userProductRelationshipModel.find({ user_id: userId });
    //     const productIds = userRatings.map(rating => rating.product_id);
    //     const users = await this.userProductRelationshipModel.distinct('user_id', { product_id: { $in: productIds }, user_id: { $ne: userId } });
    //     console.log("Phai in ra nguoi khac====="+users)
    //     const userProductRelationships = await this.userProductRelationshipModel.find({ user_id: { $in: users } });
    //     console.log("In ra user product rating cua nguoi khac===="+userProductRelationships)
    //     return userProductRelationships;
    // }

    async getUsersWhoRatedSameProducts(userId: string): Promise<string[]> {
        const userProductRatings = await this.getUserProductRatingsByUserId(userId);
        const productIds = userProductRatings.map((rating) => rating.product_id);
        const users = await this.userProductRelationshipModel.distinct('user_id', { product_id: { $in: productIds }, user_id: { $ne: userId } }).exec();
        return users;
      }
      

    // async getSharedProductRatings(userId: string, otherUserId: string): Promise<UserProductRelationship[]> {
    //     const currentUserRatings = await this.getUserProductRatingsByUserId(userId);
    //     // console.log("curren user rate==="+currentUserRatings);
    //     const otherUserRatings = await this.getUserProductRatingsByUserId(otherUserId);
    //     // console.log("other user rating==="+otherUserRatings);
      
    //     const sharedProductIds = currentUserRatings
    //       .filter(rating => otherUserRatings.some(r => r.product_id === rating.product_id))
    //       .map(rating => rating.product_id);
        
    //     //   console.log("shared product===="+sharedProductIds);
      
    //     const sharedRatings = currentUserRatings.filter(rating => sharedProductIds.includes(rating.product_id));
    //     // console.log("nhung san pham rate chung===="+sharedRatings);
      
    //     return sharedRatings;
    //   }
      

    // async getProductsByUserFiltering(userId: string): Promise<Product[]> {
    //     // Get the list of product_ids that the user has rated
    //     const userRatings = await this.userProductRelationshipModel.find({ user_id: userId });

    //     // Get all products
    //     const allProducts = await this.productService.getAllProducts();

    //     // Calculate the cosine similarity between the user and other users who have rated products
    //     const userSimilarities = await this.userProductSimilarityService.calculateUserProductSimilarity(userId);
    //     console.log("Do tuong dong Object====="+userSimilarities)

    //     // Sort the users by similarity score in descending order
    //     userSimilarities.sort((a, b) => b.similarity_score - a.similarity_score);

    //     // Select the top 5 most similar users
    //     const k=5;
    //     const topKUsers = userSimilarities.slice(0, k);
    //     console.log("top K users===="+topKUsers)

    //     // Create a map of product IDs to their average ratings
    //     const productRatings = new Map<string, number>();
    //     for (const rating of userRatings) {
    //         const productId = rating.product_id.toString();
    //         const ratingValue = rating.rating;
    //         if (productRatings.has(productId)) {
    //             const currentValue = productRatings.get(productId);
    //             productRatings.set(productId, currentValue + ratingValue);
    //         } else {
    //             productRatings.set(productId, ratingValue);
    //         }
    //     }
    //     for (const productId of productRatings.keys()) {
    //         const ratingSum = productRatings.get(productId);
    //         const ratingCount = userRatings.filter(rating => rating.product_id.toString() === productId).length;
    //         productRatings.set(productId, ratingSum / ratingCount);
    //     }

    //     // Calculate the predicted ratings for all products that the user has not rated
    //     const predictedRatings = new Map<string, number>();
    //     for (const product of allProducts) {
    //         const productId = product._id;
    //         if (!productRatings.has(productId)) {
    //         let numerator = 0;
    //         let denominator = 0;
    //         for (const user of topKUsers) {
    //             const similarityScore = user.similarity_score;
    //             const userRatings = await this.userProductRelationshipModel.find({user_id: user.user_id});
    //             const rating = userRatings.find(rating => rating.product_id.toString() === productId);
    //             if (rating) {
    //             const ratingValue = rating.rating;
    //             const userAverageRating = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;
    //             numerator += similarityScore * (ratingValue - userAverageRating);
    //             denominator += similarityScore;
    //             }
    //         }
    //         const predictedRating = denominator === 0 ? 0 : numerator / denominator;
    //         predictedRatings.set(productId, predictedRating);
    //         }
    //     }

    //     // Select the top n products with the highest predicted ratings
    //     const n = 10;
    //     const recommendedProducts = Array.from(predictedRatings.entries())
    //         .sort((a, b) => b[1] - a[1])
    //         .slice(0, n)
    //         .map(([productId]) => allProducts.find(product => product.id === productId));
        
    //     return recommendedProducts;
        
    // }

    async getSharedProductRatings(userId: string, otherUserId: string): Promise<UserProductRelationship[]> {
        const userProductRatings = await this.getUserProductRatingsByUserId(userId);
        const otherUserProductRatings = await this.getUserProductRatingsByUserId(otherUserId);
        const sharedProductIds = userProductRatings.filter((rating) => {
          return otherUserProductRatings.some((otherRating) => otherRating.product_id === rating.product_id);
        }).map((rating) => rating.product_id);
        const sharedProductRatings = userProductRatings.filter((rating) => sharedProductIds.includes(rating.product_id));
        return sharedProductRatings;
      }
      

    // async getProductsByUserFiltering(userId: string): Promise<Product[]> {
    //     // Get all the users who have rated the same products as the current user
    //     const similarUsers = await this.userProductSimilarityService.calculateUserProductSimilarity(userId);
      
    //     // Get the product ids rated by the current user
    //     const currentUserRatings = await this.userProductRelationshipModel.find({ user_id: userId }).select('product_id rating').exec();
    //     const currentUserProductIds = currentUserRatings.map((rating) => rating.product_id);
      
    //     // Create a map of products to their ratings by the current user
    //     const currentUserProductRatingsMap = new Map<string, number>();
    //     currentUserRatings.forEach((rating) => {
    //       currentUserProductRatingsMap.set(rating.product_id.toString(), rating.rating);
    //     });
      
    //     // Calculate the weighted average of ratings of each product by the similar users
    //     const weightedRatings = new Map<string, number>();
    //     const weights = new Map<string, number>();
    //     for (const similarUser of similarUsers) {
    //       // Get the product ids rated by the similar user
    //       const similarUserRatings = await this.userProductRelationshipModel.find({ user_id: similarUser.similarUser_id }).select('product_id rating').exec();
    //       const similarUserProductIds = similarUserRatings.map((rating) => rating.product_id);
      
    //       // Calculate the similarity score between the current user and the similar user
    //       const similarityScore = similarUser.similarity_score;
      
    //       // Calculate the weighted ratings and weights for each product rated by the similar user
    //       for (const productId of similarUserProductIds) {
    //         if (!currentUserProductIds.includes(productId)) {
    //           const rating = similarUserRatings.find((rating) => rating.product_id === productId)?.rating ?? 0;
    //           const weightedRating = rating * similarityScore;
    //           const weight = similarityScore;
      
    //           weightedRatings.set(productId.toString(), (weightedRatings.get(productId.toString()) ?? 0) + weightedRating);
    //           weights.set(productId.toString(), (weights.get(productId.toString()) ?? 0) + weight);
    //         }
    //       }
    //     }
      
    //     // Calculate the final rating for each product
    //     const productIds = Array.from(weightedRatings.keys());
    //     const products = productIds.map(async p => await this.productService.getOneProduct(p));
    //     const ratings: number[] = [];
    //     for (const product of products) {
    //       const productId = (await product)._id;
    //       const weightedRating = weightedRatings.get(productId) ?? 0;
    //       const weight = weights.get(productId) ?? 0;
    //       const rating = weight !== 0 ? weightedRating / weight : 0;
    //       ratings.push(rating);
    //     }
      
    //     // Sort the products by their ratings in descending order
    //     products.sort((a, b) => {
    //       const ratingA = ratings[productIds.indexOf(a.id)];
    //       const ratingB = ratings[productIds.indexOf(b.id)];
    //       return ratingB - ratingA;
    //     });
      
    //     return products;
    //   }
    

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

    
}
