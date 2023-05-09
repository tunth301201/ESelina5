import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/schemas/product.schema';
import { UserProductRelationshipService } from 'src/user-product-relationship/user-product-relationship.service';
import { ProductProductSimilarityService } from './product-product-similarity.service';
import { ProductProductRelationship } from './schemas/product-product-relationship.schema';

@Injectable()
export class ProductProductRelationshipService {
    constructor(
        @InjectModel(ProductProductRelationship.name)
        private productProductRelationshipModel: Model<ProductProductRelationship>,
        private userProductRelationshipService: UserProductRelationshipService,
        private productService: ProductService,
        private productProductSimilarityService: ProductProductSimilarityService,
    ){}


    async calculateCorrelationsForProduct(productId: string): Promise<void> {
      // Lấy danh sách các sản phẩm khác (nếu có) đã được đánh giá bởi người dùng
      const userRatedProducts = await this.userProductRelationshipService.userRatedProducts(productId);
  
      // Tính toán tất cả các giá trị tương quan cho sản phẩm được chỉ định và các sản phẩm khác đã được đánh giá bởi người dùng
      const productCorrelations = [];
      for (const otherProductId of userRatedProducts) {
        // Lấy danh sách tất cả người dùng đã đánh giá cả sản phẩm được chỉ định và sản phẩm khác
        const commonUsers = await this.userProductRelationshipService.commonUsers(productId, otherProductId);
  
        // Lấy danh sách đánh giá của người dùng cho cả sản phẩm được chỉ định và sản phẩm khác
        const userRatings = await this.userProductRelationshipService.userRatings(productId, otherProductId, commonUsers);
  
        // Tính toán tương quan giữa sản phẩm được chỉ định và sản phẩm khác bằng cosine similarity
        const ratings = new Map();
        for (const userRating of userRatings) {
          ratings.set(userRating.product_id, userRating.rating);
        }
        const product1Ratings = commonUsers.map((userId) => ratings.get(productId) || 0);
      
        const product2Ratings = commonUsers.map((userId) => ratings.get(otherProductId) || 0);
    
        const correlation = this.cosineSimilarity(product1Ratings, product2Ratings) || 0;
  
        // Lưu trữ giá trị tương quan vào mảng productCorrelations
        productCorrelations.push({
          product_id_1: productId,
          product_id_2: otherProductId,
          correlation,
        });
      }
  
      // Lưu trữ tất cả các giá trị tương quan vào bảng ProductProductRelationship
      await this.productProductRelationshipModel.deleteMany({ product_id_1: productId });
      await this.productProductRelationshipModel.insertMany(productCorrelations);
    } 

    private cosineSimilarity(a: number[], b: number[]): number {
      
      const dotProduct = a.reduce((acc, value, index) => acc + value * b[index], 0);
      const normA = Math.sqrt(a.reduce((acc, value) => acc + value ** 2, 0));
      const normB = Math.sqrt(b.reduce((acc, value) => acc + value ** 2, 0));
      
      const result = (dotProduct/(normA * normB));
      const roundedResult = +result.toFixed(8);
      return roundedResult;
    }

    async getAllProductIds(productId: string): Promise<string[]> {
      const productIds = await this.productProductRelationshipModel
      .distinct('product_id_1', { product_id_1: { $ne: productId } })
      .exec();
      const productIds2 = await this.productProductRelationshipModel
          .distinct('product_id_2', { product_id_2: { $ne: productId } })
          .exec();
      const allProductIds = [...new Set([...productIds, ...productIds2])];
      return allProductIds;
    }

    async getCorrelationBetweenProducts(productId: string, otherProductId: string): Promise<number> {
      const relationship = await this.productProductRelationshipModel
        .findOne({
          $or: [
            { product_id_1: productId, product_id_2: otherProductId },
            { product_id_1: otherProductId, product_id_2: productId },
          ],
        })
        .select({ correlation: 1 });
    
      if (relationship) {
        return relationship.correlation;
      } else {
        return 0;
      }
    }

    async getRecommendProductsByItemBasedFiltering(productId: string): Promise<Product[]> {
      await this.calculateCorrelationsForProduct(productId);
      await this.productProductSimilarityService.generateSimilarProductsForProduct(productId, 5);
      // Lấy danh sách các sản phẩm liên quan nhất với productId từ bảng ProductProductSimilarity
      const productProductSimilarity = await this.productProductSimilarityService.productProductSimilarity(productId);
  
      // Nếu không có sản phẩm nào liên quan, trả về mảng rỗng
      if (!productProductSimilarity || !productProductSimilarity.similar_product_ids) {
        return [];
      }
  
      // Lấy thông tin sản phẩm từ bảng Product và sắp xếp theo thứ tự giảm dần của giá trị tương quan
      const products = await this.productService.getProductBySimilarIds(productProductSimilarity.similar_product_ids);
  
      return products;
    }

    async getAllRecommendProductsByItemBasedFiltering(productId: string): Promise<Product[]> {
      await this.calculateCorrelationsForProduct(productId);
      await this.productProductSimilarityService.generateSimilarProductsForProduct(productId, 20);
      // Lấy danh sách các sản phẩm liên quan nhất với productId từ bảng ProductProductSimilarity
      const productProductSimilarity = await this.productProductSimilarityService.productProductSimilarity(productId);
  
      // Nếu không có sản phẩm nào liên quan, trả về mảng rỗng
      if (!productProductSimilarity || !productProductSimilarity.similar_product_ids) {
        return [];
      }
  
      // Lấy thông tin sản phẩm từ bảng Product và sắp xếp theo thứ tự giảm dần của giá trị tương quan
      const products = await this.productService.getProductBySimilarIds(productProductSimilarity.similar_product_ids);
  
      return products;
    }
  
  
    

      
}
