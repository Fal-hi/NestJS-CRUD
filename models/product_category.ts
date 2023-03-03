import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { products } from './products';

export interface product_categoryAttributes {
  id?: number;
  name_category?: string;
  description_category?: string;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'product_category', schema: 'public', timestamps: false })
export class product_category
  extends Model<product_categoryAttributes, product_categoryAttributes>
  implements product_categoryAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('product_category_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_procat_id', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  name_category?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description_category?: string;

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

  @HasMany(() => products, { sourceKey: 'id' })
  products?: products[];
}
