import { order_details } from 'models';
import { Module } from '@nestjs/common';
import { OrtailService } from './ortail.service';
import { OrtailController } from './ortail.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([order_details])],
  controllers: [OrtailController],
  providers: [OrtailService],
})
export class OrtailModule {}
