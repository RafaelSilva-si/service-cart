import CartDetails from '../../model/Cart-details';

export interface GetCartDetails {
  getCartDetails: (cartID: string) => Promise<CartDetails>;
}
