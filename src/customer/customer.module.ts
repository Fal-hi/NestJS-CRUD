import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { customers } from '../../models/customers';

@Module({
  imports: [SequelizeModule.forFeature([customers])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
