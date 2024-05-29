import CartItems from '../../domain/model/Cart-items';
import AddItemToCart, {
  AddItemToCartModel,
} from '../../domain/usecases/cart-items/add-item-to-cart';
import CartItemsRepository from '../../repositories/cart-items.repository';
import CartRepository from '../../repositories/cart-repository';
import { MissingParamError } from '../../utils/errors/missingParamError';

class AddItemToCartService implements AddItemToCart {
  private readonly cartItemsRepository: CartItemsRepository;
  private readonly cartRepository: CartRepository;

  constructor(
    cartItemsRepository: CartItemsRepository,
    cartRepository: CartRepository,
  ) {
    this.cartRepository = cartRepository;
    this.cartItemsRepository = cartItemsRepository;
  }

  async addItemToCart(data: AddItemToCartModel): Promise<CartItems> {
    if (!data.cartID) {
      const cart = await this.cartRepository.create({
        userID: data.userID,
        status: 'open',
      });
      data.cartID = cart.id;
    } else {
      const existCart = await this.cartRepository.getCartById(data.cartID);
      if (!existCart) throw new MissingParamError('Carrinho Não Existe', 401);

      if (existCart.status !== 'open')
        throw new MissingParamError('Carrinho não está aberto', 401);
    }

    return await this.cartItemsRepository.addItemToCart(data);
  }
}

export default AddItemToCartService;
