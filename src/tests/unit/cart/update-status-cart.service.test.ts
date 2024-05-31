import assert from 'assert';
import CartRepository from '../../../repositories/cart-repository';
import UpdateStatusCartService from '../../../services/cart/update-status-cart.service';
import Sinon from 'sinon';

const mocks = {
  returnCartSuccess: require('../../mocks/return-cart-success'),
};

describe('Atualiza status do Carrinho', () => {
  const cartRepository = new CartRepository();
  const updateStatusCartService = new UpdateStatusCartService(cartRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve atualizar status do carrinho.', async () => {
    Sinon.stub(CartRepository.prototype, 'getCartById').resolves({
      id: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      userID: '123',
      status: '1231',
      items: [],
    });

    Sinon.stub(CartRepository.prototype, 'update').resolves(
      mocks.returnCartSuccess,
    );

    const data = {
      cartID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      status: 'close',
    };

    const result = await updateStatusCartService.update(
      data.cartID,
      data.status,
    );
    assert.deepEqual(result, mocks.returnCartSuccess);
  });

  it('Deve retornar erro se tentar atualizar carrinho inexistente.', async () => {
    Sinon.stub(CartRepository.prototype, 'getCartById')
      .withArgs('a6fcbddd-cb9d-4d75-acb3-105a50a607e2')
      .resolves(null);

    const data = {
      cartID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
      status: 'close',
    };

    const promise = updateStatusCartService.update(data.cartID, data.status);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.status, 401);
      assert.deepEqual(error.message, 'Missing param Carrinho Não Existe');
      return true;
    });
  });
});
