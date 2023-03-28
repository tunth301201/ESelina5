import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CartItemDto {

    @IsNotEmpty()
    product_id: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class CartDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsArray()
    cart_items: CartItemDto[];
    
}