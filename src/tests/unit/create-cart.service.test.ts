import assert from 'assert';
import CreateCartService from '../../services/create-cart.service';
import CartRepository from '../../repositories/cart-repository';
import Sinon from 'sinon';
import AxiosClient from '../../infra/axios-client';
import envs from '../../config/global';

const mocks = {
  returnCartSuccess: require('../mocks/return-cart-success'),
  returnUserSuccess: require('../mocks/return-user-success.json'),
};

describe('Create Cart Service', () => {
  const cartRepository = new CartRepository();
  const axiosClient = new AxiosClient(envs.API_URL);
  const createCartService = new CreateCartService(cartRepository, axiosClient);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve criar carrinho com o userId e status.', async () => {
    Sinon.stub(AxiosClient.prototype, 'get').resolves({
      data: mocks.returnUserSuccess,
      status: 0,
      statusText: '',
      headers: undefined,
      config: undefined,
    });

    Sinon.stub(CartRepository.prototype, 'create').resolves(
      mocks.returnCartSuccess,
    );

    const data = {
      userID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    };

    const result = await createCartService.create(data);
    assert.deepEqual(result, mocks.returnCartSuccess);
  });

  it('Deve retornar erro se userId não existe.', async () => {
    Sinon.stub(AxiosClient.prototype, 'get').resolves({
      data: null,
      status: 0,
      statusText: '',
      headers: undefined,
      config: undefined,
    });

    const data = {
      userID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    };

    const promise = createCartService.create(data);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.status, 401);
      assert.deepEqual(error.message, 'Missing param Usuário Invalido');
      return true;
    });
  });
});
