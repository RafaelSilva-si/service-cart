import CartItems from '../../model/Cart-items';
import { Item } from '../../model/Item';

export interface AddItemToCartModel {
  cartID?: string;
  item: Item;
  userID: string;
  qtd: number;
}

export interface AddItemToCart {
  addItemToCart: (data: AddItemToCartModel) => Promise<CartItems>;
}

export default AddItemToCart;
