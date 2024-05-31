import CartModel from '../data/models/Cart';
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
      const cart = await CartModel.findById(cartID);
      return cart;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async create(data: CreateCartModel): Promise<Cart> {
    try {
      const result = await CartModel.create({ ...data });
      return result.save();
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async update(id: string, status: string): Promise<Cart> {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        id,
        { status },
        { new: true },
      );
      return cart;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async getCartById(id: string): Promise<Cart> {
    try {
      return await CartModel.findById(id);
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }
}

export default CartRepository;
