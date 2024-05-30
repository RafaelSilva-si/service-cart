import ClearCart from '../../domain/usecases/cart-items/clear-cart';
import CartItemsRepository from '../../repositories/cart-items.repository';

class ClearCartService implements ClearCart {
  private readonly cartItemsRepository: CartItemsRepository;

  constructor(cartItemsRepository: CartItemsRepository) {
    this.cartItemsRepository = cartItemsRepository;
  }

  async clear(cartID: string): Promise<boolean> {
    return await this.cartItemsRepository.clear(cartID);
  }
}

export default ClearCartService;
