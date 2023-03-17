import { users } from './../../models/users';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize/dist';
import { CreateUser, UpdateUser } from './user';

@Injectable()
export class UserService {
  constructor(@InjectModel(users) private userModel: typeof users) {}

  async createUser(createUser: CreateUser): Promise<users> {
    return await this.userModel.create(createUser);
  }

  async findAll(entry: any, page: any) {
    const from = (page - 1) * entry;
    const totalData = await users.count();
    const usersRow = await users.findAll({
      limit: entry,
      offset: from,

      order: [['username', 'ASC']],
    });

    const totalPage = Math.ceil(totalData / entry);

    const result = {
      usersRow: usersRow,
      page,
      rows: entry,
      totalData,

      totalPage,
      from: from + 1,
      to: +from + usersRow.length,
    };

    return result;
  }

  async getUsers(): Promise<users[]> {
    return await this.userModel.findAll<users>();
  }

  async getUserById(id: number): Promise<users | null> {
    return await this.userModel.findByPk<users>(id);
  }

  async getUserByUsername(username: string): Promise<users | null> {
    return await this.userModel.findOne<users>({
      where: {
        username,
      },
    });
  }

  async updateUser(id: number, updateUser: UpdateUser) {
    return await this.userModel.update(updateUser, {
      where: { id },
    });
  }

  async deleteUser(id: number) {
    return await this.userModel.destroy({
      where: { id },
    });
  }
}
