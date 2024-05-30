import assert from 'assert';
import CartItemsRepository from '../../../repositories/cart-items.repository';
import ClearCartService from '../../../services/cart-items/clear-cart.service';
import Sinon from 'sinon';
import CartRepository from '../../../repositories/cart-repository';

const mocks = {
  returnCartSuccess: require('../../mocks/return-cart-success'),
};

describe('Limpar carrinho', () => {
  const cartItemRepository = new CartItemsRepository();
  const cartRepository = new CartRepository();
  const clearCartService = new ClearCartService(
    cartItemRepository,
    cartRepository,
  );

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve remover todos items do carrinho', async () => {
    Sinon.stub(CartItemsRepository.prototype, 'clear').resolves(true);
    Sinon.stub(CartRepository.prototype, 'getCartById').resolves(
      mocks.returnCartSuccess,
    );

    const result = await clearCartService.clear(
      'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    );
    assert.deepEqual(result, true);
  });

  it('Deve retornar erro se o carrinho não existir', async () => {
    Sinon.stub(CartRepository.prototype, 'getCartById').resolves(null);

    const promise = clearCartService.clear(
      'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    );

    await assert.rejects(promise, {
      message: 'Missing param Carrinho não existe',
      status: 404,
    });
  });
});
