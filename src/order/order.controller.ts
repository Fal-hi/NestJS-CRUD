import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      await this.orderService.createOrder({
        ...createOrderDto,
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Successfully created order',
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Cannot create an order',
        },
        HttpStatus.NOT_IMPLEMENTED,
        {
          cause: err,
        },
      );
    }
  }

  @Get()
  async findAllOrders() {
    try {
      return await this.orderService.findAllOrders();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: err,
        },
      );
    }
  }

  @Get('byid/:id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOrderById(+id);
  }

  @Put('edit/:id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    await this.orderService.updateOrder(id, updateOrderDto);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Successfully updated order',
    };
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderService.removeOrder(+id);
  }
}
