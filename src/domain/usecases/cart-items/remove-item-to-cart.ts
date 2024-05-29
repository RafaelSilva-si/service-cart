export interface RemoveItemToCart {
  removeItem: (id: string) => Promise<boolean>;
}

export default RemoveItemToCart;
