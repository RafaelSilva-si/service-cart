import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';

class Event extends Model {
  public id!: string;
  public title!: string;
  public date!: string | Date;
  public description!: string;
  public capacity!: number;
  public category!: string;
  public status!: string;
  public cover!: string;
  public galerry!: any;
}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gallery: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
  },
);

export default Event;
