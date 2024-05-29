import Cart from '../model/Cart';

export interface GetCartById {
  getCartById: (id: string) => Promise<Cart>;
}
