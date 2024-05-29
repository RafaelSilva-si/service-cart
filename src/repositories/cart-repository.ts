import CartModel from '../data/models/Cart';
import Cart from '../domain/model/Cart';
import { CreateCart, CreateCartModel } from '../domain/usecases/create-cart';
import { GetCartById } from '../domain/usecases/get-cart-by-id';
import { UpdateStatusCart } from '../domain/usecases/update-status-cart';
import DBError from '../utils/errors/dbError';

class CartRepository implements CreateCart, UpdateStatusCart, GetCartById {
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
