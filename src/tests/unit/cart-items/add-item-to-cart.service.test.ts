import assert from 'assert';
import CartItemsRepository from '../../../repositories/cart-items.repository';
import AddItemToCartService from '../../../services/cart-items/add-item-to-cart.service';
import Sinon from 'sinon';
import CartRepository from '../../../repositories/cart-repository';

const mocks = {
  returnCartSuccess: require('../../mocks/return-cart-success'),
  returnUserSuccess: require('../../mocks/return-user-success.json'),
  returnCartItemSuccess: require('../../mocks/return-cart-item-success.json'),
  returnCartClosed: require('../../mocks/return-cart-closed.json'),
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
      itemID: '9152fc3d-0c5a-4ac3-83fe-64bd83b5307c',
      qtd: 1,
    };

    const result = await addItemToCartService.addItemToCart(data);
    assert.deepEqual(result, mocks.returnCartItemSuccess);
  });

  it('Deve retornar erro se o carrinho não existir', async () => {
    Sinon.stub(CartRepository.prototype, 'getCartById').resolves(null);

    const data = {
      userID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      itemID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      cartID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      qtd: 1,
    };

    const promise = addItemToCartService.addItemToCart(data);
    await assert.rejects(promise, {
      message: 'Missing param Carrinho Não Existe',
      status: 401,
    });
  });

  it('Deve retornar erro se o status do carrinho for diferente de "open"', async () => {
    Sinon.stub(CartRepository.prototype, 'getCartById').resolves(
      mocks.returnCartClosed,
    );

    const data = {
      userID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      itemID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      cartID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      qtd: 1,
    };

    const promise = addItemToCartService.addItemToCart(data);
    await assert.rejects(promise, {
      message: 'Missing param Carrinho não está aberto',
      status: 401,
    });
  });
});
