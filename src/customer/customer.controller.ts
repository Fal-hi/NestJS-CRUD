import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerClass } from './customer';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('join')
  async getJoin() {
    try {
      return this.customerService.findAllCustomersAndJoin();
    } catch (error) {
      return error;
    }
  }

  @Post('create')
  async createCustomer(@Body() createCustomer: CustomerClass[]) {
    try {
      this.customerService.createCustomer({
        ...createCustomer,
      });
      return {
        status: 'Success',
        message: 'Successfully created customer',
      };
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getCustomers() {
    try {
      return this.customerService.getCustomers();
    } catch (error) {
      return error;
    }
  }

  @Get('byid/:id')
  async getCustomerById(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getCustomerById(id);
  }

  @Get('byname/:firstname')
  async getCustomerByFirstname(@Param('firstname') firtsname: string) {
    return this.customerService.getCustomerByUsername(firtsname);
  }

  @Put('edit/:id')
  async updateCustomer(
    @Param('id') id: number,
    @Body() updateCustomer: CustomerClass,
  ) {
    try {
      await this.customerService.updateCustomer(id, updateCustomer);
      return {
        status: 'Success',
        message: 'Successfully updated customer',
      };
    } catch (error) {
      return error;
    }
  }

  @Delete('delete/:id')
  async deleteCustomer(@Param('id') id: number) {
    try {
      await this.customerService.deleteCustomer(id);
      return {
        status: 'Success',
        message: 'Successfully updated customer',
      };
    } catch (error) {
      return error;
    }
  }
}
