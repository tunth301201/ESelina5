import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promotion } from './schemas/promotion.schema';
import { PromotionProduct } from './schemas/promotion-product.schema';
import { CreatePromotionDto, UpdatePromotionDto } from './dto/promotion.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name) private promotionModel: Model<Promotion>,
    @InjectModel(PromotionProduct.name) private promotionProductModel: Model<PromotionProduct>,
    private productService: ProductService,
  ) {}

  async createPromotion(promotionDto: CreatePromotionDto): Promise<Promotion> {
    const { products, start_date, end_date, ...rest } = promotionDto;
    const createdPromotion = new this.promotionModel({
        ...rest,
        start_date: start_date,
        end_date: end_date,
    });
    await createdPromotion.save();

    if (products && products.length) {
      createdPromotion.products = products;
      const promotionProducts = products.map(
        (productId) =>
          new this.promotionProductModel({ promotion_id: createdPromotion.id, product_id: productId }),
      );
      await this.promotionProductModel.insertMany(promotionProducts);
      await createdPromotion.save();

      for (const productId of products) {
        await this.productService.updateDiscount(productId.toString());
      }
    }

    return createdPromotion;
  }

  async getAllPromotion(): Promise<Promotion[]> {
    return this.promotionModel.find().populate('products').exec();
  }

  async getOnePromotion(id: string): Promise<Promotion> {
    return this.promotionModel.findById(id).populate('products').exec();
  }

  async updatePromotion(id: string, promotionDto: UpdatePromotionDto): Promise<Promotion> {
    const { products, start_date, end_date, ...rest } = promotionDto;

    const promotion = await this.promotionModel.findByIdAndUpdate(
      id,
      {
        ...rest,
        start_date: start_date,
        end_date: end_date,
      },
      {
        new: true, 
      },
    );

    if (products && products.length) {
      const newPromotionProducts = products.map(
        (productId) =>
          new this.promotionProductModel({ promotion_id: id, product_id: productId }),
      );
      await this.promotionProductModel.deleteMany({ promotion_id: id });
      await this.promotionProductModel.insertMany(newPromotionProducts);
      promotion.products = newPromotionProducts.map(
        (promotionProduct) => promotionProduct.product_id,
      );
    } else {
      await this.promotionProductModel.deleteMany({ promotion_id: id });
      promotion.products = [];
    }

    return promotion;
  }

  async deletePromotion(id: string): Promise<any> {
    const promotion = await this.promotionModel.findByIdAndDelete(id).exec();
    await this.promotionProductModel.deleteMany({ promotion_id: id });
    return promotion;
  }

  async searchPromotion(keyword: string): Promise<Promotion[]> {
    const regex = new RegExp(keyword, 'i');
        const promotions = await this.promotionModel.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { start_date: { $regex: regex } },
                { end_date: { $regex: regex } },
            ],
        }).populate('products').exec();
    return promotions;

  }

  async formatDateInput(inputDate: string): Promise<Date> {
    const [month, day, year] = inputDate.split('-').map((str) => parseInt(str));
    return new Date(year, month - 1, day);
}

}