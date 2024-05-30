export interface ClearCart {
  clear(cartID: string): Promise<boolean>;
}

export default ClearCart;
