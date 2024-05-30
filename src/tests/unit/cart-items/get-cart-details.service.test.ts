import assert from 'assert';
import Sinon from 'sinon';
import GetCartDetailsService from '../../../services/cart-items/get-cart-details.service';
import CartRepository from '../../../repositories/cart-repository';

const mocks = {
  returnCartDetails: require('../../mocks/return-cart-details.json'),
};

describe('Listar carrinho', () => {
  const cartRepository = new CartRepository();
  const getCartDetailsService = new GetCartDetailsService(cartRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve retornar detalhes do carrinho, items, valor total e status.', async () => {
    Sinon.stub(CartRepository.prototype, 'getCartDetails').resolves(
      mocks.returnCartDetails,
    );

    const result = await getCartDetailsService.getCartDetails(
      'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    );

    assert.deepEqual(result, mocks.returnCartDetails);
  });
});
