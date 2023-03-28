import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getAllCategories() {
        return await this.categoryService.getAllCategories();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles('seller')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.createCategory(createCategoryDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put(':id')
    @Roles('seller')
    async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return await this.categoryService.updateCategory(id, updateCategoryDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    @Roles('seller')
    async deleteCategory(@Param('id') id: string) {
        return await this.categoryService.deleteCategory(id);
    }

    @Get('/search')
    async searchCategory(@Query('keyword') keyword: string) {
        return await this.categoryService.searchCategory(keyword);
    }

}
