import CartItemsRepository from '../../repositories/cart-items.repository';
import { MissingParamError } from '../../utils/errors/missingParamError';

class RemoveItemToCartService implements RemoveItemToCartService {
  private readonly cartItemsRepository: CartItemsRepository;

  constructor(cartItemsRepository: CartItemsRepository) {
    this.cartItemsRepository = cartItemsRepository;
  }

  async removeItem(id: string): Promise<boolean> {
    const existItem = await this.cartItemsRepository.getItemByID(id);
    if (!existItem) throw new MissingParamError('Item inexistente', 401);

    return await this.cartItemsRepository.removeItem(id);
  }
}

export default RemoveItemToCartService;
