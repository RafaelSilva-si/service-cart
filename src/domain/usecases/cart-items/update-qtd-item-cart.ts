import CartItems from '../../model/Cart-items';

export interface UpdateQtdItemCartModel {
  id: string;
  qtd: number;
}

export interface UpdateQtdItemCart {
  updateQtdItemCart: (data: UpdateQtdItemCartModel) => Promise<CartItems>;
}
