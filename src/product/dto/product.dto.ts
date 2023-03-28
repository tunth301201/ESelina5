import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  image: Buffer[];

  @IsNotEmpty()
  @IsString()
  category_id: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
