import CartDetails from '../../domain/model/Cart-details';
import { GetCartDetails } from '../../domain/usecases/cart/get-cart-details';
import AxiosClient from '../../infra/axios-client';
import CartRepository from '../../repositories/cart-repository';

class GetCartDetailsService implements GetCartDetails {
  private readonly cartRepository: CartRepository;
  private readonly httpClient: AxiosClient;

  constructor(cartRepository: CartRepository, httpClient: AxiosClient) {
    this.cartRepository = cartRepository;
    this.httpClient = httpClient;
  }

  async getCartDetails(cartID: string): Promise<CartDetails> {
    const result = await this.cartRepository.getCartDetails(cartID);
    const data = result;
    await Promise.all(
      data.items.map(async (item) => {
        const itemDetails = await this.httpClient.get(`/event/${item.itemID}`);
        Object.assign(item, itemDetails);
      }),
    );

    return data;
  }
}

export default GetCartDetailsService;
