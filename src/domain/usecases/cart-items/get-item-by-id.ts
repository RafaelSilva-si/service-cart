import CartItems from '../../model/Cart-items';

export interface GetItemByID {
  getItemByID: (id: string) => Promise<CartItems | null>;
}
