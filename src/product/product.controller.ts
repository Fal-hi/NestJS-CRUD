import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './multer.config';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.productService.uploadFile(file);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      const finalImageUrl = `${req.protocol}://${req.get(
        'host',
      )}/products/uploads/${file.filename}`;
      const product = await this.productService.createProduct({
        ...createProductDto,
        image: finalImageUrl,
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Successfully created product',
        data: product,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @Get('uploads/:image')
  async getImage(@Param('image') image: string, @Res() res: any) {
    try {
      const showImage = path.join(process.cwd(), 'uploads/' + image);
      res.sendFile(showImage);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAllProducts() {
    try {
      const product = await this.productService.findAllProducts();
      return {
        status: HttpStatus.FOUND,
        data: product,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @Get('byid/:id')
  async findProductById(@Param('id') id: number) {
    try {
      const product = await this.productService.findProductById(id);
      if (product) {
        return {
          status: HttpStatus.FOUND,
          data: product,
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product id not found',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @Get('byname/:name')
  async findProductByName(@Param('name') name: string) {
    try {
      const product = await this.productService.findProductByName(name);
      if (product) {
        return {
          status: HttpStatus.FOUND,
          data: product,
        };
      } else {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Product name not found',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error occurred while fetching product',
        error: error.message,
      };
    }
  }

  @Put('edit/:id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      let filename: string;
      if (file) {
        filename = file.filename;
      }
      const product = await this.productService.findProductById(id);
      const oldImageProduct = product.image; // image lama
      const url = oldImageProduct.split('/'); // ['http:','','localhost:3000','products','uploads','image_280577232.jpg']
      const imageFile = url[url.length - 1]; // image_280577232.jpg
      const imagesPath = path.resolve(
        __dirname,
        '../../..',
        'uploads/',
        `${imageFile}`,
      ); // D:\nestjs\nestexample\uploads\image_189665793.jpg

      const finalImageUrl = `${req.protocol}://${req.get(
        'host',
      )}/products/uploads/${filename}`; // http://localhost:3000/products/uploads/image_262928084.jpg,

      if (product) {
        if (fs.existsSync(imagesPath)) {
          fs.unlink(imagesPath, async (err) => {
            if (err) return err;
            const result = await product.update(
              {
                ...updateProductDto,
                image: finalImageUrl,
              },
              {
                where: { id },
              },
            );
            return res.status(HttpStatus.ACCEPTED).send({
              status: HttpStatus.ACCEPTED,
              message: 'Successfully updated data',
              data: result,
            });
          });
        }
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error,
      };
    }
  }

  @Delete('delete/:id')
  async removeProduct(@Param('id') id: number) {
    try {
      const product = await this.productService.removeProduct(id);
      if (product) {
        return {
          status: HttpStatus.OK,
          message: 'Successfully deleted product',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }
}
