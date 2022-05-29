import { IsDefined, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsString()
  index: string;

  @Column()
  @IsDefined()
  @IsString()
  label: string;

  @Column()
  @IsDefined()
  @IsString()
  description: string;
}
