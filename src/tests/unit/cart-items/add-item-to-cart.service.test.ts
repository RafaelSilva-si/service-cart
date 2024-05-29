import assert from 'assert';
import CartItemsRepository from '../../../repositories/cart-items.repository';
import AddItemToCartService from '../../../services/cart-items/add-item-to-cart.service';
import Sinon from 'sinon';
import CartRepository from '../../../repositories/cart-repository';

const mocks = {
  returnCartSuccess: require('../../mocks/return-cart-success'),
  returnUserSuccess: require('../../mocks/return-user-success.json'),
  returnCartItemSuccess: require('../../mocks/return-cart-item-success.json'),
};

describe('Add Item To Cart', () => {
  const cartItemRepository = new CartItemsRepository();
  const cartRepository = new CartRepository();
  const addItemToCartService = new AddItemToCartService(
    cartItemRepository,
    cartRepository,
  );

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve adicionar um item ao carrinho', async () => {
    Sinon.stub(CartRepository.prototype, 'create').resolves(
      mocks.returnCartSuccess,
    );

    Sinon.stub(CartItemsRepository.prototype, 'addItemToCart').resolves(
      mocks.returnCartItemSuccess,
    );

    const data = {
      userID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      itemID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      qtd: 1,
    };

    const result = await addItemToCartService.addItemToCart(data);
    assert.deepEqual(result, mocks.returnCartItemSuccess);
  });
});
