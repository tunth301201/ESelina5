import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PromotionProduct, PromotionProductDocument } from '../promotion/schemas/promotion-product.schema';
import { Promotion, PromotionDocument } from 'src/promotion/schemas/promotion.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(PromotionProduct.name) private promotionProductModel: Model<PromotionProductDocument>,
    @InjectModel(Promotion.name) private promotionModel: Model<PromotionDocument>,
    ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().populate('category_id').exec();
  }

  async getFiveProducts(): Promise<Product[]> {
    return (await this.productModel.find().populate('category_id').exec()).slice(0,5);
  }

  async getProductsByTagId(tagId: string): Promise<Product[]> {
    return this.productModel.find({category_id: tagId}).populate('category_id').exec();
  }

  async getOneProduct(id: string): Promise<Product> {
    return this.productModel.findById(id).populate('category_id').exec();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async searchProduct(keyword: string): Promise<Product[]> {
    const regex = new RegExp(keyword, 'i');
    const products = await this.productModel.find({
      $or: [
        { name: {$regex: regex}},
        { description: {$regex: regex}}
      ]
    }).populate('category_id').exec();
    return products;
  }

  async getMaxDiscountPromotion(productId: string): Promise<number> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    
    const promotionProducts = await this.promotionProductModel.find({ product_id: productId });
    const promotionIds = promotionProducts.map((pp) => pp.promotion_id);
    
    const now = new Date();
    const promotions = await this.promotionModel.find({ 
      _id: { $in: promotionIds },
      start_date: { $lte: now },
      end_date: { $gte: now }, 
    }).exec();
    
    let maxDiscount = 0;
    
    for (const promotion of promotions) {
      if (promotion.discount > maxDiscount) {
        maxDiscount = promotion.discount;
      }
    }
    
    return maxDiscount;
  }

  async updateDiscount(productId: string): Promise<any> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const maxDiscountPromotion = await this.getMaxDiscountPromotion(productId);
    if (((100-maxDiscountPromotion)*product.price/100) < product.discount) {
      product.discount = (100-maxDiscountPromotion)*product.price/100;
      await product.save();
    }
  }

  // Loop through all products
  async loopAllProducts(): Promise<any>{
    return await this.productModel.find().select('_id').lean();
  }

  // Get products by similar IDs
  async getProductBySimilarIds(similarProductIds: Types.ObjectId[]): Promise<Product[]>{
    return await this.productModel.find({ _id: { $in: similarProductIds } }).lean();
  }

  // Get products by collan id
  async getProductByCollabSimilarIds(similarProductIds: string[]): Promise<Product[]>{
    console.log("collab pass id: ", similarProductIds);
    return await this.productModel.find({ _id: { $in: similarProductIds } }).exec();
  }


  async budgetThisMonth(): Promise<{ budget: number; percentage: number }> {
    // Calculate the budget for the current month
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const currentMonthProducts = await this.productModel
      .find({
        createdAt: {
          $gte: new Date(`${currentYear}-${String(currentMonth).padStart(2, '0')}-01T00:00:00.000Z`),
          $lte: new Date(
            `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01T00:00:00.000Z`,
          ),
        },
      })
      .exec();
    const currentMonthBudget = currentMonthProducts.reduce(
      (total, product) => total + product.discount,
      0,
    );

    // Calculate the budget for the previous month
    const previousMonth = currentMonth - 1 <= 0 ? 12 : currentMonth - 1;
    const previousYear =
      previousMonth === 12 ? currentYear - 1 : currentYear;
    const previousMonthProducts = await this.productModel
      .find({
        createdAt: {
          $gte: new Date(
            `${previousYear}-${String(previousMonth).padStart(2, '0')}-01T00:00:00.000Z`,
          ),
          $lte: new Date(`${currentYear}-${String(currentMonth).padStart(2, '0')}-01T00:00:00.000Z`),
        },
      })
      .exec();
    const previousMonthBudget = previousMonthProducts.reduce(
      (total, product) => total + product.discount,
      0,
    );

    // Calculate the percentage change between the two budgets
    const percentage =
      ((currentMonthBudget - previousMonthBudget) / previousMonthBudget) * 100;

    return { budget: currentMonthBudget, percentage };
  }

  async totalBudget(): Promise<number> {
    const products = await this.productModel.find().exec();
    let totalDiscount = 0;
  
    products.forEach((product) => {
      totalDiscount += product.discount;
    });
  
    return totalDiscount;
  }

  async fiveLastestProducts(): Promise<ProductDocument[]> {
    const products = await this.productModel.find().sort({ createdAt: -1 }).limit(5);
    return products;
  }
  
  


}
