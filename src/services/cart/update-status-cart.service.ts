import Cart from '../../domain/model/Cart';
import { UpdateStatusCart } from '../../domain/usecases/cart/update-status-cart';
import CartRepository from '../../repositories/cart-repository';
import { MissingParamError } from '../../utils/errors/missingParamError';

class UpdateStatusCartService implements UpdateStatusCart {
  private readonly cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async update(id: string, status: string): Promise<Cart> {
    const existCart = await this.cartRepository.getCartById(id);
    if (!existCart) throw new MissingParamError('Carrinho Não Existe', 401);

    return await this.cartRepository.update(id, status);
  }
}

export default UpdateStatusCartService;
