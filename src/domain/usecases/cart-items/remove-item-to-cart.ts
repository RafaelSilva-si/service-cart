export interface RemoveItemToCartModel {
  cartID?: string;
  itemID: string;
  userID: string;
}

export interface RemoveItemToCart {
  removeItem: (data: RemoveItemToCartModel) => Promise<boolean>;
}

export default RemoveItemToCart;
