import { Injectable } from '@nestjs/common';
import { CreateOrtailDto } from './dto/create-ortail.dto';
import { UpdateOrtailDto } from './dto/update-ortail.dto';
import { InjectModel } from '@nestjs/sequelize';
import { order_details } from 'models';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OrtailService {
  constructor(
    @InjectModel(order_details) private ortailModel: typeof order_details,
  ) {}

  async createOrtail(createOrtailDto: CreateOrtailDto): Promise<order_details> {
    const ortail = plainToClass(this.ortailModel, createOrtailDto);
    return await ortail.save();
  }

  async findAllOrtails(): Promise<order_details[]> {
    return await this.ortailModel.findAll<order_details>();
  }

  async findOrtailById(id: number): Promise<order_details> {
    return await this.ortailModel.findByPk<order_details>(id);
  }

  async updateOrtail(
    id: number,
    updateOrtailDto: UpdateOrtailDto,
  ): Promise<order_details> {
    const ortail = plainToClass(this.ortailModel, updateOrtailDto, {
      excludeExtraneousValues: true,
    });
    const [affectedCount, [updatedRow]] = await this.ortailModel.update(
      ortail.toJSON(),
      {
        where: { id },
        returning: true,
      },
    );
    return updatedRow;
  }

  async removeOrtail(id: number): Promise<number> {
    return await this.ortailModel.destroy({
      where: { id },
    });
  }
}
