import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orders } from '../../models/orders';

@Module({
  imports: [SequelizeModule.forFeature([orders])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
