import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';

class Cart extends Model {
  public id!: string;
  public userID!: string;
  public status!: string;
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: sequelize.models.User,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
  },
);

Cart.belongsTo(sequelize.models.User, { foreignKey: 'userID', as: 'user' });

export default Cart;
