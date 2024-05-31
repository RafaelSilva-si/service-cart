export interface CartItems {
  id: string;
  cartID: string;
  itemID: string;
  userID: string;
  qtd: number;
  title: string;
  date: string;
  description: string;
  category: string;
  cover: string;
  location: string;
  price: number;
}

export default CartItems;
