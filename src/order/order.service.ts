import { orders } from './../../models/orders';
import { InjectModel } from '@nestjs/sequelize/dist';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(orders) private orderModel: typeof orders) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<orders> {
    return await this.orderModel.create(createOrderDto);
  }

  async findAllOrders(): Promise<orders[]> {
    return await this.orderModel.findAll<orders>();
  }

  async findOrderById(id: number): Promise<orders | null> {
    return await this.orderModel.findByPk<orders>(id);
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderModel.update(updateOrderDto, {
      where: { id },
    });
  }

  async removeOrder(id: number) {
    return await this.orderModel.destroy({
      where: { id },
    });
  }
}
