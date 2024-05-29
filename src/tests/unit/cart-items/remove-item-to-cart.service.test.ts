import assert from 'assert';
import CartItemsRepository from '../../../repositories/cart-items.repository';
import RemoveItemToCartService from '../../../services/cart-items/remove-item-to-cart.service';
import Sinon from 'sinon';

const mocks = {
  returnCartItemSuccess: require('../../mocks/return-cart-item-success.json'),
};

describe('Remover Item do Carrinho', () => {
  const cartItemRepository = new CartItemsRepository();
  const removeItemToCartService = new RemoveItemToCartService(
    cartItemRepository,
  );

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve remover um item existente do carrinho', async () => {
    Sinon.stub(CartItemsRepository.prototype, 'getItemByID').resolves(
      mocks.returnCartItemSuccess,
    );
    Sinon.stub(CartItemsRepository.prototype, 'removeItem').resolves(true);

    const result = await removeItemToCartService.removeItem(
      'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    );

    assert.deepEqual(result, true);
  });

  it('Deve retornar erro se o item não existir', async () => {
    Sinon.stub(CartItemsRepository.prototype, 'getItemByID').resolves(null);

    const promise = removeItemToCartService.removeItem(
      'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    );

    await assert.rejects(promise, {
      message: 'Missing param Item inexistente',
      status: 401,
    });
  });
});
