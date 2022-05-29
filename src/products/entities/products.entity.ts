import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsString()
  label: string;

  @Column()
  @IsDefined()
  @IsString()
  description: string;

  @Column()
  @IsDefined()
  @IsNumber()
  price: number;

  @Column()
  @IsDefined()
  @IsNumber()
  category_id: number;

  @Column()
  @IsOptional()
  @IsString()
  thumbnail_url: string;

  @Column()
  @IsDefined()
  @IsBoolean()
  visible_public: boolean;

  @Column()
  @IsDefined()
  @IsBoolean()
  visible_authenticated: boolean;
}
