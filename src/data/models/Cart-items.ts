import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';
import Cart from './Cart';

class CartItems extends Model {
  public id!: string;
  public cartID!: string;
  public itemID!: string;
  public userID!: string;
  public qtd!: number;
}

CartItems.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    cartID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Cart,
        key: 'id',
      },
    },
    itemID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    qtd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'CartItems',
    tableName: 'cart_items',
  },
);

// CartItems.belongsTo(Cart, { foreignKey: 'cartID' });

export default CartItems;
