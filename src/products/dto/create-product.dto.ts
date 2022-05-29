export class CreateProductDto {
  id: number;
  label: string;
  description: string;
  price: number;
  category_id: number;
  thumbnail_url: string;
  visible_public: boolean;
  visible_authenticated: boolean;
}
