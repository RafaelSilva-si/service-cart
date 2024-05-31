import { NextFunction, Request, Response } from 'express';
import AddItemToCartService from '../services/cart-items/add-item-to-cart.service';
import ClearCartService from '../services/cart-items/clear-cart.service';
import GetCartDetailsService from '../services/cart-items/get-cart-details.service';
import UpdateQtdItemCartService from '../services/cart-items/update-qtd-item-cart.service';

class CartController {
  private readonly addItemToCartService: AddItemToCartService;
  private readonly getCartDetailsService: GetCartDetailsService;
  private readonly updateQtdItemCartService: UpdateQtdItemCartService;
  private readonly clearCartService: ClearCartService;
  constructor(
    addItemToCartService: AddItemToCartService,
    getCartDetailsService: GetCartDetailsService,
    updateQtdItemCartService: UpdateQtdItemCartService,
    clearCartService: ClearCartService,
  ) {
    this.addItemToCartService = addItemToCartService;
    this.getCartDetailsService = getCartDetailsService;
    this.updateQtdItemCartService = updateQtdItemCartService;
    this.clearCartService = clearCartService;
  }

  public addItemToCart = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const cartItem = await this.addItemToCartService.addItemToCart(req.body);
      res.status(201).send(cartItem);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };

  public getCartDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const cart = await this.getCartDetailsService.getCartDetails(
        req.params.cartID,
      );
      res.status(200).send(cart);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };

  public updateQtdItemCart = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const cart = await this.updateQtdItemCartService.updateQtdItemCart({
        cartID: req.body.cartID,
        itemID: req.body.itemID,
        qtd: req.body,
      });

      res.status(200).send(cart);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };

  public clearCart = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.clearCartService.clear(req.params.cartID);
      res.status(200).send(result);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };
}

export default CartController;
