import { products } from 'models';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([products])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
