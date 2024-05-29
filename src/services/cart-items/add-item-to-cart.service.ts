import CartItems from '../../domain/model/Cart-items';
import AddItemToCart, {
  AddItemToCartModel,
} from '../../domain/usecases/cart-items/add-item-to-cart';
import CartItemsRepository from '../../repositories/cart-items.repository';
import CartRepository from '../../repositories/cart-repository';

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
    }

    return await this.cartItemsRepository.addItemToCart(data);
  }
}

export default AddItemToCartService;
