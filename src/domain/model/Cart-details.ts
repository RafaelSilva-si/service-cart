import Cart from './Cart';
import CartItems from './Cart-items';

export interface CartDetails extends Cart {
  items: CartItems[];
}

export default CartDetails;
