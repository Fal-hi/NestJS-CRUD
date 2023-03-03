import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { products } from 'models';
import { plainToClass } from 'class-transformer';
import { product_category } from '../../models/product_category';

@Injectable()
export class ProductService {
  constructor(@InjectModel(products) private productModel: typeof products) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return file.filename;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<products> {
    const product = plainToClass(this.productModel, createProductDto); // Map the DTO to the model
    return await product.save(); // Save the new product and return it
  }

  async findAllProducts(): Promise<products[]> {
    return await this.productModel.findAll<products>({
      include: [{ model: product_category }],
    });
  }

  async findProductById(id: number): Promise<products> {
    return await this.productModel.findByPk<products>(id);
  }

  async findProductByName(name: string): Promise<products> {
    return await this.productModel.findOne<products>({
      where: { name },
    });
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<[any]> {
    const result = await this.productModel.update(updateProductDto, {
      where: { id },
    });
    return result;
  }

  async removeProduct(id: number): Promise<number> {
    return await this.productModel.destroy({
      where: { id },
    });
  }
}
