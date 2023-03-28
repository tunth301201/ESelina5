import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {}
