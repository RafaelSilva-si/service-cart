import CartItems from '../../domain/model/Cart-items';
import {
  UpdateQtdItemCart,
  UpdateQtdItemCartModel,
} from '../../domain/usecases/cart-items/update-qtd-item-cart';
import CartItemsRepository from '../../repositories/cart-items.repository';

class UpdateQtdItemCartService implements UpdateQtdItemCart {
  private readonly cartItemsRepository: CartItemsRepository;

  constructor(cartItemsRepository: CartItemsRepository) {
    this.cartItemsRepository = cartItemsRepository;
  }

  async updateQtdItemCart(data: UpdateQtdItemCartModel): Promise<CartItems> {
    return await this.cartItemsRepository.updateQtdItemCart(data);
  }
}

export default UpdateQtdItemCartService;
