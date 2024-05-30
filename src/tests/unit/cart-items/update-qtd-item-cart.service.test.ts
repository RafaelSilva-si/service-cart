import assert from 'assert';
import CartItemsRepository from '../../../repositories/cart-items.repository';
import Sinon from 'sinon';
import UpdateQtdItemCartService from '../../../services/cart-items/update-qtd-item-cart.service';

const mocks = {
  returnCartItemSuccess: require('../../mocks/return-cart-item-success.json'),
};

describe('Atualizar Qtd de Item do Carrinho', () => {
  const cartItemRepository = new CartItemsRepository();
  const updateQtdItemCartService = new UpdateQtdItemCartService(
    cartItemRepository,
  );

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve atualizar a quantidade de um item do carrinho', async () => {
    Sinon.stub(CartItemsRepository.prototype, 'updateQtdItemCart').resolves(
      mocks.returnCartItemSuccess,
    );

    const data = {
      cartID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      itemID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      qtd: 1,
    };

    const result = await updateQtdItemCartService.updateQtdItemCart(data);
    assert.deepEqual(result, mocks.returnCartItemSuccess);
  });
});
