import CartItemsModel from '../data/models/Cart-items';
import CartItems from '../domain/model/Cart-items';
import AddItemToCart, {
  AddItemToCartModel,
} from '../domain/usecases/cart-items/add-item-to-cart';
import { GetItemByID } from '../domain/usecases/cart-items/get-item-by-id';
import RemoveItemToCart from '../domain/usecases/cart-items/remove-item-to-cart';
import {
  UpdateQtdItemCart,
  UpdateQtdItemCartModel,
} from '../domain/usecases/cart-items/update-qtd-item-cart';
import DBError from '../utils/errors/dbError';

class CartItemsRepository
  implements AddItemToCart, RemoveItemToCart, GetItemByID, UpdateQtdItemCart
{
  async addItemToCart(data: AddItemToCartModel): Promise<CartItems> {
    try {
      return await CartItemsModel.create({ data });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async removeItem(id: string): Promise<boolean> {
    try {
      await CartItemsModel.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async getItemByID(id: string): Promise<CartItems | null> {
    try {
      return await CartItemsModel.findOne({ where: { id } });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async updateQtdItemCart(data: UpdateQtdItemCartModel): Promise<CartItems> {
    try {
      const result = await CartItemsModel.update(
        { qtd: data.qtd },
        {
          where: { id: data.itemID, cartID: data.cartID },
          returning: true,
        },
      );
      return result[1][0].dataValues;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }
}

export default CartItemsRepository;
