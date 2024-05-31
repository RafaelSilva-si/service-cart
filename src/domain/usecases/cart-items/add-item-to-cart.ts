import CartItems from '../../model/Cart-items';

export interface AddItemToCartModel {
  cartID?: string;
  itemID: string;
  userID: string;
  qtd: number;
}

export interface AddItemToCart {
  addItemToCart: (data: AddItemToCartModel) => Promise<CartItems>;
}

export default AddItemToCart;
