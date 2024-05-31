import CartItems from '../../domain/model/Cart-items';
import {
  UpdateQtdItemCart,
  UpdateQtdItemCartModel,
} from '../../domain/usecases/cart-items/update-qtd-item-cart';
import CartItemsRepository from '../../repositories/cart-items.repository';
import { MissingParamError } from '../../utils/errors/missingParamError';

class UpdateQtdItemCartService implements UpdateQtdItemCart {
  private readonly cartItemsRepository: CartItemsRepository;

  constructor(cartItemsRepository: CartItemsRepository) {
    this.cartItemsRepository = cartItemsRepository;
  }

  async updateQtdItemCart(data: UpdateQtdItemCartModel): Promise<CartItems> {
    const existItem = await this.cartItemsRepository.getItemByID(data.id);
    if (!existItem)
      throw new MissingParamError('Item do carrinho não encontrado', 404);

    if (data.qtd <= 0) {
      await this.cartItemsRepository.removeItem(data.id);
    }

    return await this.cartItemsRepository.updateQtdItemCart(data);
  }
}

export default UpdateQtdItemCartService;
