import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import {readFileSync, unlinkSync} from 'fs';
import { promisify } from 'util';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get('/five-products')
  async getFiveProducts() {
    return await this.productService.getFiveProducts();
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    return await this.productService.getOneProduct(id);
  }

  @Get('/tag/:tagId')
  async getProductsByTagId(@Param('tagId') tagId: string) {
    return await this.productService.getProductsByTagId(tagId);
  }
 
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Post()
  // @Roles('seller')
  // @UseInterceptors(FileInterceptor('file', storage))
  // async createProduct(@Body() createProductDto: any, @UploadedFile() file) {


  //   console.log(file);

  //   // const imageBuffers = images.map(image => {
  //   //   return {
  //   //     data: image.buffer,
  //   //     contentType: image.mimetype
  //   //   };
  //   // });

  //   // const createdProduct = new this.productModel(createProductDto);
  //   // return createdProduct.save();

  //   // return await this.productService.createProduct(createProductDto);
  // }

  // test
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', 10, { dest: './uploads' }))
  async uploadMultiple(@Body() createProductDto, @UploadedFiles()files) {

    const {name, description, price, stock, discount, category_id} = createProductDto;
    const imageBuffers = await Promise.all(
      files.map(async (file) => { 
        return {
          data: readFileSync(file.path),
          contentType: file.mimetype,
        };
      }),
    );

    const createdProduct = new this.productModel({
      name: name,
      description: description,
      price: price,
      stock: stock,
      discount: discount,
      category_id: category_id,
      images: imageBuffers,
    });

    files.forEach((file) => {
      unlinkSync(file.path);
    });
    
    return createdProduct.save();
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Put(':id')
  // @Roles('seller')
  // async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return await this.productService.updateProduct(id, updateProductDto);
  // }


  @Put('/:id') 
  @UseInterceptors(FilesInterceptor('file', 10, { dest: './uploads' }))
  async updateProduct(@Param('id') id: string, @Body() updateProductDto, @UploadedFiles() files) {
    const { name, description, price, stock, discount, category_id } = updateProductDto;
    
    const imageBuffers = await Promise.all(
      files.map(async (file) => { 
        return {
          data: readFileSync(file.path),
          contentType: file.mimetype,
        };
      }),
    );

  const updatedProduct = await this.productModel.findByIdAndUpdate(
    id,
    {
      name: name,
      description: description,
      price: price,
      stock: stock,
      discount: discount,
      category_id: category_id,
      images: imageBuffers,
    },
    { new: true },
  );

  files.forEach((file) => {
    unlinkSync(file.path);
  });

  return updatedProduct;
}









  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @Roles('seller')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Get('/product/search')
    async searchProduct(@Query('keyword') keyword: string){
        return await this.productService.searchProduct(keyword);
    }

  // @Get('/product/budgetThisMonth')
  // async getBudgetThisMonth() {
  //   return await this.productService.budgetThisMonth();
  // }

  @Get('/product/totalBudget')
  async getTotalBudget() {
    return await this.productService.totalBudget();
  }

  @Get('/product/fiveLatestProducts')
  async getFiveLastestProduct() {
    return await this.productService.fiveLastestProducts();
  }
}
