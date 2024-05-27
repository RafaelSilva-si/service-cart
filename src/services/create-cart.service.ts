import Cart from '../domain/model/Cart';
import { CreateCart } from '../domain/usecases/create-cart';
import CartRepository from '../repositories/cart-repository';

class CreateCartService implements CreateCart {
  private readonly cartRepository: CartRepository;
  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async create(data: any): Promise<Cart> {
    return await this.cartRepository.create(data);
  }
}

export default CreateCartService;
