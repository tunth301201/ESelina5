import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    ) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return await createdCategory.save();
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }
    
    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
    }
    
    async deleteCategory(id: string): Promise<any> {
        return await this.categoryModel.findByIdAndDelete(id).exec();
    }

    // search category by name
    async searchCategory(keyword: string): Promise<Category[]> {
        const regex = new RegExp(keyword, 'i');
        const categories = await this.categoryModel.find({
            name: { $regex: regex }
        }).exec();
        return categories;
    }

    async getOneCategory(id: string): Promise<Category> {
        return await this.categoryModel.findById(id).exec();
    }
}
