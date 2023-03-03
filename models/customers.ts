import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { users } from './users';

export interface customersAttributes {
  id?: number;
  firstname?: string;
  lastname?: string;
  user_id?: number;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'customers', schema: 'public', timestamps: false })
export class customers
  extends Model<customersAttributes, customersAttributes>
  implements customersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('customers_id_seq'::regclass)"),
  })
  @Index({ name: 'pk_customer_id', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  firstname?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  lastname?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updatedat?: Date;

  @HasOne(() => users, { sourceKey: 'user_id' })
  user?: users;
}
