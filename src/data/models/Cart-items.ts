import mongoose, { Schema } from 'mongoose';
import CartItems from '../../domain/model/Cart-items';

const cartItemSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
    },
    cartID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    itemID: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    qtd: {
      type: Number,
      required: true,
      default: 1,
    },
    title: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const CartItem = mongoose.model<CartItems>('CartItem', cartItemSchema);

export default CartItem;
