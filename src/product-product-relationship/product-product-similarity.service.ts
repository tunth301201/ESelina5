import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductProductSimilarity } from './schemas/product-product-similarity.schema';
import { ProductProductRelationshipService } from './product-product-relationship.service';

@Injectable()
export class ProductProductSimilarityService {
    constructor(
        @InjectModel(ProductProductSimilarity.name)
        private productProductSimilarityModel: Model<ProductProductSimilarity>,
        @Inject(forwardRef(() => ProductProductRelationshipService))
        private productProductRelationshipService: ProductProductRelationshipService,
    ){}


    async generateSimilarProductsForProduct(productId: string, topN: number): Promise<void> {
      // Get all products
      const allProducts = await this.productProductRelationshipService.getAllProductIds(productId);
   
      // Remove the product with the given productId from the list of all products
      const otherProducts = allProducts.filter((pId) => pId !== productId);
   
      // Calculate the correlation between the given product and all other products
      const correlations = await Promise.all(
        otherProducts.map(async (otherProductId) => ({
          productId: otherProductId,
          correlation: await this.productProductRelationshipService.getCorrelationBetweenProducts(productId, otherProductId),
        })),
      );
   
      // Sort the products by correlation in descending order and get the top N products
      const topSimilarProducts = correlations
        .sort((a, b) => b.correlation - a.correlation)
        .slice(0, topN)
        .map((c) => c.productId);

    
      // Save the top similar products to the ProductProductSimilarity table
      await this.productProductSimilarityModel.findOneAndUpdate(
        { product_id: productId },
        { similar_product_ids: topSimilarProducts },
        { upsert: true },
      );
    }
      
    async productProductSimilarity(productId: string): Promise<ProductProductSimilarity> {
      return await this.productProductSimilarityModel.findOne({ product_id: productId });
    }
      
      
}
