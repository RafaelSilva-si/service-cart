import assert from 'assert';
import CartItemsRepository from '../../../repositories/cart-items.repository';
import AddItemToCartService from '../../../services/cart-items/add-item-to-cart.service';
import Sinon from 'sinon';
import CartRepository from '../../../repositories/cart-repository';
import AxiosClient from '../../../infra/axios-client';
import envs from '../../../config/global';

const mocks = {
  returnCartSuccess: require('../../mocks/return-cart-success'),
  returnUserSuccess: require('../../mocks/return-user-success.json'),
  returnCartItemSuccess: require('../../mocks/return-cart-item-success.json'),
  returnCartClosed: require('../../mocks/return-cart-closed.json'),
  returnSuccessEvent: require('../../mocks/return-success-event.json'),
};

describe('Add Item To Cart', () => {
  const cartItemRepository = new CartItemsRepository();
  const cartRepository = new CartRepository();
  const axiosClient = new AxiosClient(envs.API_URL);

  const addItemToCartService = new AddItemToCartService(
    cartItemRepository,
    cartRepository,
    axiosClient,
  );

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve adicionar um item ao carrinho', async () => {
    Sinon.stub(CartRepository.prototype, 'create').resolves(
      mocks.returnCartSuccess,
    );

    Sinon.stub(AxiosClient.prototype, 'get').resolves({
      data: mocks.returnUserSuccess,
    });

    Sinon.stub(CartItemsRepository.prototype, 'addItemToCart').resolves(
      mocks.returnCartItemSuccess,
    );

    const data = {
      userID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      item: {
        _id: '665a0d0bb6409a4984e7ce07',
        title: 'Evento Teste',
        date: '2024-06-01T12:00:00.000Z',
        description: 'Descrição do evento teste',
        category: 'Categoria do Evento',
        cover: 'teste',
        location: 'Expo SP',
        price: 50,
      },
      qtd: 1,
    };

    const result = await addItemToCartService.addItemToCart(data);
    assert.deepEqual(result, mocks.returnCartItemSuccess);
  });

  it('Deve retornar erro se o carrinho não existir', async () => {
    Sinon.stub(CartRepository.prototype, 'getCartById').resolves(null);

    const data = {
      userID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      item: {
        _id: '665a0d0bb6409a4984e7ce07',
        title: 'Evento Teste',
        date: '2024-06-01T12:00:00.000Z',
        description: 'Descrição do evento teste',
        category: 'Categoria do Evento',
        cover: 'teste',
        location: 'Expo SP',
        price: 50,
      },
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
      item: {
        _id: '665a0d0bb6409a4984e7ce07',
        title: 'Evento Teste',
        date: '2024-06-01T12:00:00.000Z',
        description: 'Descrição do evento teste',
        category: 'Categoria do Evento',
        cover: 'teste',
        location: 'Expo SP',
        price: 50,
      },
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
