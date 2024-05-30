import assert from 'assert';
import CartItemsRepository from '../../../repositories/cart-items.repository';
import ClearCartService from '../../../services/cart-items/clear-cart.service';
import Sinon from 'sinon';

describe('Limpar carrinho', () => {
  const cartItemRepository = new CartItemsRepository();
  const clearCartService = new ClearCartService(cartItemRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve remover todos items do carrinho', async () => {
    Sinon.stub(CartItemsRepository.prototype, 'clear').resolves(true);

    const result = await clearCartService.clear(
      'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    );
    assert.deepEqual(result, true);
  });
});
