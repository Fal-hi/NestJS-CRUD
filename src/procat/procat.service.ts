import { product_category } from './../../models/product_category';
import { Injectable } from '@nestjs/common';
import { CreateProcatDto } from './dto/create-procat.dto';
import { UpdateProcatDto } from './dto/update-procat.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProcatService {
  constructor(
    @InjectModel(product_category) private procatModel: typeof product_category,
  ) {}

  async createProcat(
    createProcatDto: CreateProcatDto,
  ): Promise<product_category> {
    return await this.procatModel.create(createProcatDto);
  }

  async findAllProcats(): Promise<product_category[]> {
    return await this.procatModel.findAll<product_category>();
  }

  async findProcatById(id: number): Promise<product_category> {
    return await this.procatModel.findByPk<product_category>(id);
  }

  async findProcateByName(name_category: string): Promise<product_category> {
    return await this.procatModel.findOne<product_category>({
      where: { name_category },
    });
  }

  async updateProcat(
    id: number,
    updateProcatDto: UpdateProcatDto,
  ): Promise<product_category> {
    const [affectedCount, updatedRows] = await this.procatModel.update(
      updateProcatDto,
      {
        where: { id },
        returning: true, // This is necessary to get the updated row
      },
    );
    return updatedRows[0];
  }

  async removeProcat(id: number): Promise<number> {
    return await this.procatModel.destroy({
      where: { id },
    });
  }
}
