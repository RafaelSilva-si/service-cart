import Cart from '../model/Cart';

export interface CreateCartModel {
  userID: string;
  status?: string;
}

export interface CreateCart {
  create: (data: CreateCartModel) => Promise<Cart>;
}
