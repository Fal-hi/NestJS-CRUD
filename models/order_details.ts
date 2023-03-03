import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface order_detailsAttributes {
  id?: number;
  quantity?: number;
  order_id?: number;
  product_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'order_details', schema: 'public', timestamps: false })
export class order_details
  extends Model<order_detailsAttributes, order_detailsAttributes>
  implements order_detailsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('order_details_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_ortail_id', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  quantity?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  order_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  product_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  created_at?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updated_at?: Date;
}
