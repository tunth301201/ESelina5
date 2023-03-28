import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    return await this.productService.getOneProduct(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Roles('seller')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  @Roles('seller')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @Roles('seller')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Get('/search')
    async searchProduct(@Query('keyword') keyword: string){
        return await this.productService.searchProduct(keyword);
    }
}
