import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/schemas/product.schema';
import { UserProductRelationship, UserProductRelationshipDocument } from 'src/user-product-relationship/schemas/user-product-relationship.schema';
import { UserProductRelationshipService } from 'src/user-product-relationship/user-product-relationship.service';
import { UserProductCollabSimilarity } from './schemas/user-product-collab-similarity.schema';
import { UserProductCollab } from './schemas/user-product-collab.schema';

@Injectable()
export class UserProductCollabService {
    constructor(
      @InjectModel(UserProductCollabSimilarity.name)
        private userProductCollabSimilarityModel: Model<UserProductCollabSimilarity>,
      @InjectModel(UserProductCollab.name)
        private userProductCollabModel: Model<UserProductCollab>,
        private userProductRelationshipService: UserProductRelationshipService,
        private productService: ProductService,
    ){}

    async getSimilarUsers(userId: string, k: number): Promise<UserProductCollabSimilarity[]> {
      // Truy vấn CSDL để lấy userId-danh sách productIds - ratings tương ứng của người dùng hiện tại
        const ratedProducts = await this.userProductRelationshipService.getRatedProductsByUser(userId);
      
        // Get all users who rated the same products as the target user
        const userIds = await this.userProductRelationshipService.getUserIdsByRatedProducts(ratedProducts);
      
        // Calculate similarity between users
        const similarities = await Promise.all(userIds.map(async (id) => {
          if (id.user_id.toString() !== userId) {
            const ratedProducts2 = await this.userProductRelationshipService.getRatedProductsByUser(id.user_id.toString());
            const similarity = this.calculateSimilarity(ratedProducts, ratedProducts2);
            return { user_id: userId, other_user_id: id.user_id.toString(), similarity_score: similarity };
          }
        }));
      
        // Sort users by similarity and return the top k similar users
        const sortedSimilarities = similarities.filter(similarity => similarity !== undefined).sort((a, b) => b!.similarity_score - a!.similarity_score).slice(0, k);
        
        await this.userProductCollabSimilarityModel.deleteMany({ user_id: userId });
        const result = await this.userProductCollabSimilarityModel.insertMany(sortedSimilarities);

        return result;
      }

      // Tính toán độ tương đồng dựa trên danh sách sản phẩm được đánh giá bởi hai người dùng
    private calculateSimilarity(ratedProducts1: UserProductRelationship[], ratedProducts2: UserProductRelationship[]): number {
        // Tạo một set chứa tất cả các sản phẩm đã được đánh giá bởi cả hai người dùng
        const intersection = new Set(
          ratedProducts1.map((rp) => rp.product_id).filter((pid) =>
            ratedProducts2.some((rp) => rp.product_id === pid)
          )
        );
      
        // Nếu không có sản phẩm nào chung, độ tương đồng bằng 0
        if (intersection.size === 0) {
          return 0;
        }
      
        // Tính toán tổng bình phương của đánh giá của cả hai người dùng trên các sản phẩm chung
        const squareSum1 = ratedProducts1
          .filter((rp) => intersection.has(rp.product_id))
          .reduce((sum, rp) => sum + rp.rating * rp.rating, 0);
        const squareSum2 = ratedProducts2
          .filter((rp) => intersection.has(rp.product_id))
          .reduce((sum, rp) => sum + rp.rating * rp.rating, 0);
      
        // Tính toán tích vô hướng giữa các đánh giá của cả hai người dùng trên các sản phẩm chung
        const productSum = ratedProducts1
          .filter((rp) => intersection.has(rp.product_id))
          .reduce((sum, rp1) => {
            const rp2 = ratedProducts2.find((rp) => rp.product_id === rp1.product_id);
            return sum + rp1.rating * rp2.rating;
          }, 0);
      
        // Tính toán độ tương đồng dựa trên công thức Cosine Similarity
        const numerator = productSum;
        const denominator =
          Math.sqrt(squareSum1) * Math.sqrt(squareSum2) || Number.MIN_VALUE;
        return numerator / denominator;
      }

      async getRecommendProductByCollab(userId: string): Promise<Product[]> {
        const allProducts = await this.productService.getAllProducts();

        // Truy vấn cơ sở dữ liệu để lấy tất cả các sản phẩm đã được đánh giá và các đánh giá của người dùng (userId-product_ids-ratings)
        const ratedProducts = await this.userProductRelationshipService.getRatedProductsByUser(userId);
      
        if (ratedProducts.length === 0) {
          return [];
        }
      
        const similarUsers = await this.getSimilarUsers(userId, 10);

        const recommendedProducts: { [productId: string]: number } = {};
      
        for (const similarUser of similarUsers) {

          // Lấy ra các sản phẩm họ đã đánh giá và người dùng hiện tại chưa đánh giá
          const products = await this.userProductRelationshipService.getUnratedProductsByUser(similarUser.other_user_id.toString(), ratedProducts);

          for (const product of products) {
            let weight = product.rating * similarUser.similarity_score;

            if (recommendedProducts[product.product_id.toString()]) {
              recommendedProducts[product.product_id.toString()] += weight;
            } else {
              recommendedProducts[product.product_id.toString()] = weight;
            }
          }
        }
      
        const sortedProducts = Object.keys(recommendedProducts)
          .map(productId => ({ productId, weight: recommendedProducts[productId] }))
          .sort((a, b) => b.weight - a.weight);
      
        const recommendedProductIds = sortedProducts.slice(0, 5).map(item => allProducts.find(product => product.id === item.productId));

        // Lưu dô db để truy xuất nhanh ko cần tính lại. Suy nghĩ lại chia hàm ra
        await this.userProductCollabModel.findOneAndUpdate(
          { user_id: new Types.ObjectId(userId) },
          { recommended_productIds: recommendedProductIds },
          { upsert: true },
        );
      

        return recommendedProductIds;
      }

      async getAllRecommendProductByCollab(userId: string): Promise<Product[]> {
        const allProducts = await this.productService.getAllProducts();

        // Truy vấn cơ sở dữ liệu để lấy tất cả các sản phẩm đã được đánh giá và các đánh giá của người dùng (userId-product_ids-ratings)
        const ratedProducts = await this.userProductRelationshipService.getRatedProductsByUser(userId);
      
        if (ratedProducts.length === 0) {
          return [];
        }
      
        const similarUsers = await this.getSimilarUsers(userId, 10);

        const recommendedProducts: { [productId: string]: number } = {};
      
        for (const similarUser of similarUsers) {

          // Lấy ra các sản phẩm họ đã đánh giá và người dùng hiện tại chưa đánh giá
          const products = await this.userProductRelationshipService.getUnratedProductsByUser(similarUser.other_user_id.toString(), ratedProducts);

          for (const product of products) {
            let weight = product.rating * similarUser.similarity_score;

            if (recommendedProducts[product.product_id.toString()]) {
              recommendedProducts[product.product_id.toString()] += weight;
            } else {
              recommendedProducts[product.product_id.toString()] = weight;
            }
          }
        }
      
        const sortedProducts = Object.keys(recommendedProducts)
          .map(productId => ({ productId, weight: recommendedProducts[productId] }))
          .sort((a, b) => b.weight - a.weight);
        
      
        const recommendedProductIds = sortedProducts.map(item => allProducts.find(product => product.id === item.productId));
      
        return recommendedProductIds;
      }
      
      
      
}
