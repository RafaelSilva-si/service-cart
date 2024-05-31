import Cart from '../../domain/model/Cart';
import { CreateCart } from '../../domain/usecases/cart/create-cart';
import AxiosClient from '../../infra/axios-client';
import CartRepository from '../../repositories/cart-repository';
import { MissingParamError } from '../../utils/errors/missingParamError';

class CreateCartService implements CreateCart {
  private readonly cartRepository: CartRepository;
  private readonly axiosClient: AxiosClient;

  constructor(cartRepository: CartRepository, axiosClient: AxiosClient) {
    this.cartRepository = cartRepository;
    this.axiosClient = axiosClient;
  }

  async create(data: any): Promise<Cart> {
    const user: any = await this.axiosClient.get('/user');
    if (!user.data) throw new MissingParamError('Usuário Invalido', 401);

    data.userID = user.data.id;
    return await this.cartRepository.create(data);
  }
}

export default CreateCartService;
