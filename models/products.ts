import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { product_category } from './product_category';

export interface productsAttributes {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category_id?: number;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'products', schema: 'public', timestamps: false })
export class products
  extends Model<productsAttributes, productsAttributes>
  implements productsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('products_id_seq'::regclass)"),
  })
  @Index({ name: 'pk_product_id', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  price?: number;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  image?: string;

  @ForeignKey(() => product_category)
  @Column({ allowNull: true, type: DataType.INTEGER })
  category_id?: number;

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

  @BelongsTo(() => product_category)
  product_category?: product_category;
}
