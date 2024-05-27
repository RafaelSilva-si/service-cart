import assert from 'assert';
import CreateCartService from '../../services/create-cart.service';
import CartRepository from '../../repositories/cart-repository';
import Sinon from 'sinon';

const mocks = {
  returnCartSuccess: require('../mocks/return-cart-success'),
};

describe('Create Cart Service', () => {
  const cartRepository = new CartRepository();
  const createCartService = new CreateCartService(cartRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve criar carrinho com o userId e status.', async () => {
    Sinon.stub(CartRepository.prototype, 'create').resolves(
      mocks.returnCartSuccess,
    );

    const data = {
      userID: 'a6fcbddd-cb9d-4d75-acb3-105a50a607e2',
    };

    const result = await createCartService.create(data);
    assert.deepEqual(result, mocks.returnCartSuccess);
  });
});
