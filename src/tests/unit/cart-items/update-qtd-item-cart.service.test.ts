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
    Sinon.stub(CartItemsRepository.prototype, 'getItemByID').resolves(
      mocks.returnCartItemSuccess,
    );
    Sinon.stub(CartItemsRepository.prototype, 'updateQtdItemCart').resolves(
      mocks.returnCartItemSuccess,
    );

    const data = {
      id: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      qtd: 1,
    };

    const result = await updateQtdItemCartService.updateQtdItemCart(data);
    assert.deepEqual(result, mocks.returnCartItemSuccess);
  });

  it('Deve retornar erro se o item do carrinho não existir', async () => {
    Sinon.stub(CartItemsRepository.prototype, 'getItemByID').resolves(null);

    const data = {
      id: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      qtd: 1,
    };

    const promise = updateQtdItemCartService.updateQtdItemCart(data);
    await assert.rejects(promise, {
      message: 'Missing param Item do carrinho não encontrado',
      status: 404,
    });
  });

  it('Deve remover item do carrinho se a quantidade for 0', async () => {
    Sinon.stub(CartItemsRepository.prototype, 'getItemByID').resolves(
      mocks.returnCartItemSuccess,
    );
    Sinon.stub(CartItemsRepository.prototype, 'updateQtdItemCart').resolves(
      mocks.returnCartItemSuccess,
    );
    Sinon.stub(CartItemsRepository.prototype, 'removeItem').resolves(true);

    const data = {
      id: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      qtd: 0,
    };

    const result = await updateQtdItemCartService.updateQtdItemCart(data);
    assert.deepEqual(result, mocks.returnCartItemSuccess);
  });
});
