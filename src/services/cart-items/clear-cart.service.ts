import ClearCart from '../../domain/usecases/cart-items/clear-cart';
import CartItemsRepository from '../../repositories/cart-items.repository';
import CartRepository from '../../repositories/cart-repository';
import { MissingParamError } from '../../utils/errors/missingParamError';

class ClearCartService implements ClearCart {
  private readonly cartItemsRepository: CartItemsRepository;
  private readonly cartRepository: CartRepository;

  constructor(
    cartItemsRepository: CartItemsRepository,
    cartRepository: CartRepository,
  ) {
    this.cartItemsRepository = cartItemsRepository;
    this.cartRepository = cartRepository;
  }

  async clear(cartID: string): Promise<boolean> {
    const existCart = await this.cartRepository.getCartById(cartID);
    if (!existCart) throw new MissingParamError('Carrinho não existe', 404);

    return await this.cartItemsRepository.clear(cartID);
  }
}

export default ClearCartService;
