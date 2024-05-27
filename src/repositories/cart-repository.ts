import CartModel from '../data/models/Cart';
import Cart from '../domain/model/Cart';
import { CreateCart, CreateCartModel } from '../domain/usecases/create-cart';
import DBError from '../utils/errors/dbError';

class CartRepository implements CreateCart {
  async create(data: CreateCartModel): Promise<Cart> {
    try {
      return await CartModel.create({ data });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }
}

export default CartRepository;
