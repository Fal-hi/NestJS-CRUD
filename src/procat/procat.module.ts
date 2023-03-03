import { product_category } from './../../models/product_category';
import { Module } from '@nestjs/common';
import { ProcatService } from './procat.service';
import { ProcatController } from './procat.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([product_category])],
  controllers: [ProcatController],
  providers: [ProcatService],
})
export class ProcatModule {}
