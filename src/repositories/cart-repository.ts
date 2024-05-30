import CartModel from '../data/models/Cart';
import CartItems from '../data/models/Cart-items';
import Cart from '../domain/model/Cart';
import CartDetails from '../domain/model/Cart-details';
import {
  CreateCart,
  CreateCartModel,
} from '../domain/usecases/cart/create-cart';
import { GetCartById } from '../domain/usecases/cart/get-cart-by-id';
import { GetCartDetails } from '../domain/usecases/cart/get-cart-details';
import { UpdateStatusCart } from '../domain/usecases/cart/update-status-cart';
import DBError from '../utils/errors/dbError';

class CartRepository
  implements CreateCart, UpdateStatusCart, GetCartById, GetCartDetails
{
  async getCartDetails(cartID: string): Promise<CartDetails> {
    try {
      return await CartModel.findOne({
        where: { id: cartID },
        include: [{ model: CartItems, as: 'items', include: ['event'] }],
      });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async create(data: CreateCartModel): Promise<Cart> {
    try {
      return await CartModel.create({ data });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async update(id: string, status: string): Promise<Cart> {
    try {
      const result = await CartModel.update(
        { status },
        {
          where: { id },
          returning: true,
        },
      );
      return result[1][0].dataValues;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async getCartById(id: string): Promise<Cart> {
    try {
      return await CartModel.findOne({ where: { id } });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }
}

export default CartRepository;
