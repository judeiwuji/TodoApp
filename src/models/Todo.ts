import {
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './User';
import { Optional } from 'sequelize';

export interface TodoAttributes {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoCreationAttributes
  extends Optional<TodoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
@Table
export default class Todo extends Model<
  TodoAttributes,
  TodoCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4 })
  id!: string;

  @IsUUID(4)
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @Column(DataType.STRING(150))
  title!: string;
}
