import { CustomerClass } from './customer';
import { customers } from './../../models/customers';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from '../../models/users';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(customers) private customerModel: typeof customers,
    private sequelize: Sequelize,
  ) {}

  async findAllCustomersAndJoin(): Promise<any> {
    try {
      return await this.sequelize.query('SELECT * FROM "customerortail"'); // with view
    } catch (error) {
      return error;
    }
  }

  async createCustomer(createCustomer: CustomerClass[]): Promise<customers> {
    return await this.customerModel.create(createCustomer);
  }

  async getCustomers(): Promise<customers[]> {
    return await this.customerModel.findAll<customers>({
      include: [{ model: users }],
    });
  }

  async getCustomerById(id: number): Promise<customers | null> {
    return await this.customerModel.findByPk<customers>(id);
  }

  async getCustomerByUsername(firstname: string): Promise<customers | null> {
    return await this.customerModel.findOne<customers>({
      where: {
        firstname,
      },
    });
  }

  async updateCustomer(id: number, updateCustomer: CustomerClass) {
    return await this.customerModel.update(updateCustomer, {
      where: { id },
    });
  }

  async deleteCustomer(id: number) {
    return await this.customerModel.destroy({
      where: { id },
    });
  }
}
