import { IsDefined, IsEmail, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsString()
  name: string;

  @Column()
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsDefined()
  @IsString()
  password_hash: string;
}
