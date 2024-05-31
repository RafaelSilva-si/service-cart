import assert from 'assert';
import Sinon from 'sinon';
import GetCartDetailsService from '../../../services/cart-items/get-cart-details.service';
import CartRepository from '../../../repositories/cart-repository';
import envs from '../../../config/global';
import AxiosClient from '../../../infra/axios-client';

const mocks = {
  returnCartDetails: require('../../mocks/return-cart-details.json'),
};

describe('Listar carrinho', () => {
  const cartRepository = new CartRepository();
  const axiosClient = new AxiosClient(envs.API_URL);
  const getCartDetailsService = new GetCartDetailsService(
    cartRepository,
    axiosClient,
  );

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve retornar detalhes do carrinho, items, valor total e status.', async () => {
    Sinon.stub(CartRepository.prototype, 'getCartDetails').resolves(
      mocks.returnCartDetails,
    );

    Sinon.stub(AxiosClient.prototype, 'get').resolves({
      data: mocks.returnCartDetails,
    });

    const result = await getCartDetailsService.getCartDetails(
      '41abe05c-3acb-471f-9634-fa366f3d5fbd',
    );

    assert.deepEqual(result, mocks.returnCartDetails);
  });
});
