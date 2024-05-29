import CartItemsModel from '../data/models/Cart-items';
import CartItems from '../domain/model/Cart-items';
import AddItemToCart, {
  AddItemToCartModel,
} from '../domain/usecases/cart-items/add-item-to-cart';
import RemoveItemToCart from '../domain/usecases/cart-items/remove-item-to-cart';
import DBError from '../utils/errors/dbError';

class CartItemsRepository implements AddItemToCart, RemoveItemToCart {
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
}

export default CartItemsRepository;
