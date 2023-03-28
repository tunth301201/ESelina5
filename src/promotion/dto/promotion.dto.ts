import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @IsNotEmpty()
  start_date: string;

  @IsNotEmpty()
  end_date: string;

  products: Types.ObjectId[];
}

export class UpdatePromotionDto extends CreatePromotionDto {}
