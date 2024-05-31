import CartItems from '../../domain/model/Cart-items';
import AddItemToCart, {
  AddItemToCartModel,
} from '../../domain/usecases/cart-items/add-item-to-cart';
import AxiosClient from '../../infra/axios-client';
import CartItemsRepository from '../../repositories/cart-items.repository';
import CartRepository from '../../repositories/cart-repository';
import { MissingParamError } from '../../utils/errors/missingParamError';

class AddItemToCartService implements AddItemToCart {
  private readonly cartItemsRepository: CartItemsRepository;
  private readonly cartRepository: CartRepository;
  private readonly httpClient: AxiosClient;

  constructor(
    cartItemsRepository: CartItemsRepository,
    cartRepository: CartRepository,
    httpClient: AxiosClient,
  ) {
    this.cartRepository = cartRepository;
    this.cartItemsRepository = cartItemsRepository;
    this.httpClient = httpClient;
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

    const getItemDetails = await this.httpClient.get(`/event/${data.item}`);
    if (!getItemDetails)
      throw new MissingParamError('Item não encontrado', 404);

    data.item = getItemDetails;

    return await this.cartItemsRepository.addItemToCart(data);
  }
}

export default AddItemToCartService;
