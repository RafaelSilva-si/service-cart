import CartDetails from '../../domain/model/Cart-details';
import { GetCartDetails } from '../../domain/usecases/cart/get-cart-details';
import CartRepository from '../../repositories/cart-repository';

class GetCartDetailsService implements GetCartDetails {
  private readonly cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async getCartDetails(cartID: string): Promise<CartDetails> {
    return await this.cartRepository.getCartDetails(cartID);
  }
}

export default GetCartDetailsService;
