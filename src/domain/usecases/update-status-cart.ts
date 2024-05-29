import Cart from '../model/Cart';

export interface UpdateStatusCart {
  update: (id: string, status: string) => Promise<Cart>;
}
