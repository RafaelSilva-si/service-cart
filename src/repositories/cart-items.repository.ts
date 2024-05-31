import CartItemsModel from '../data/models/Cart-items';
import CartItems from '../domain/model/Cart-items';
import AddItemToCart, {
  AddItemToCartModel,
} from '../domain/usecases/cart-items/add-item-to-cart';
import ClearCart from '../domain/usecases/cart-items/clear-cart';
import { GetItemByID } from '../domain/usecases/cart-items/get-item-by-id';
import RemoveItemToCart from '../domain/usecases/cart-items/remove-item-to-cart';
import {
  UpdateQtdItemCart,
  UpdateQtdItemCartModel,
} from '../domain/usecases/cart-items/update-qtd-item-cart';
import DBError from '../utils/errors/dbError';

class CartItemsRepository
  implements
    AddItemToCart,
    RemoveItemToCart,
    GetItemByID,
    UpdateQtdItemCart,
    ClearCart
{
  async addItemToCart(data: AddItemToCartModel): Promise<CartItems> {
    try {
      const result = await CartItemsModel.create({ ...data });
      return result.save();
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async removeItem(id: string): Promise<boolean> {
    try {
      const result = await CartItemsModel.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async getItemByID(id: string): Promise<CartItems | null> {
    try {
      return await CartItemsModel.findById(id);
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async updateQtdItemCart(data: UpdateQtdItemCartModel): Promise<CartItems> {
    try {
      const result = await CartItemsModel.findByIdAndUpdate(
        data.itemID,
        { qtd: data.qtd },
        { new: true },
      );
      return result;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async clear(cartID: string): Promise<boolean> {
    try {
      const result = await CartItemsModel.deleteMany({ cartID });
      return result.deletedCount > 0;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }
}

export default CartItemsRepository;
