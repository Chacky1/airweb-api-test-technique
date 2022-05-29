import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { Categories } from './categories/entities/categories.entity';
import { Products } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';
import { Users } from './users/entities/users.entity';
import { HashUserPasswordMiddleware } from './users/middlewares/hashUserPassword.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './DATABASE.sqlite',
      entities: [Users, Products, Categories],
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashUserPasswordMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
