import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// export class OrderItemDto {

//     @IsNotEmpty()
//     product_id: string;;

//     @IsNotEmpty()
//     @IsNumber()
//     quantity: number;

// }

export class OrderDto {

    @IsNotEmpty()
    @IsString()
    delivery_phone: string;

    @IsNotEmpty()
    @IsString()
    delivery_address: string;

    @IsNotEmpty()
    @IsString()
    carrier: string;

    @IsNotEmpty()
    @IsString()
    payment_method: string;

    // @IsNotEmpty()
    // @IsArray()
    // order_items: OrderItemDto[];
}

