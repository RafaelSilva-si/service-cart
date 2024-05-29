import CartItems from '../../model/Cart-items';

export interface UpdateQtdItemCartModel {
  cartID: string;
  itemID: string;
  qtd: number;
}

export interface UpdateQtdItemCart {
  updateQtdItemCart: (data: UpdateQtdItemCartModel) => Promise<CartItems>;
}
