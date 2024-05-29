import CartItemsRepository from '../../repositories/cart-items.repository';

class RemoveItemToCartService implements RemoveItemToCartService {
  private readonly cartItemsRepository: CartItemsRepository;

  constructor(cartItemsRepository: CartItemsRepository) {
    this.cartItemsRepository = cartItemsRepository;
  }

  async removeItem(id: string): Promise<boolean> {
    return await this.cartItemsRepository.removeItem(id);
  }
}

export default RemoveItemToCartService;
