import { Router } from 'express';
import CartController from './controllers/cart.controller';
import AddItemToCartService from './services/cart-items/add-item-to-cart.service';
import GetCartDetailsService from './services/cart-items/get-cart-details.service';
import UpdateQtdItemCartService from './services/cart-items/update-qtd-item-cart.service';
import ClearCartService from './services/cart-items/clear-cart.service';
import CartItemsRepository from './repositories/cart-items.repository';
import CartRepository from './repositories/cart-repository';
import envs from './config/global';
import AxiosClient from './infra/axios-client';

const router = Router();
const cartItemRepository = new CartItemsRepository();
const cartRepository = new CartRepository();
const axiosClient = new AxiosClient(envs.API_URL);

const addItemToCartService = new AddItemToCartService(
  cartItemRepository,
  cartRepository,
  axiosClient,
);
const getCartDetailsService = new GetCartDetailsService(
  cartRepository,
  axiosClient,
);
const updateQtdItemCartService = new UpdateQtdItemCartService(
  cartItemRepository,
);
const clearCartService = new ClearCartService(
  cartItemRepository,
  cartRepository,
);

const cartController = new CartController(
  addItemToCartService,
  getCartDetailsService,
  updateQtdItemCartService,
  clearCartService,
);

router.post('/', cartController.addItemToCart);
router.get('/:cartID', cartController.getCartDetails);
router.patch('/', cartController.updateQtdItemCart);
router.delete('/:cartID', cartController.clearCart);

export default router;
