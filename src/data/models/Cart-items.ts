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
      type: mongoose.Types.ObjectId,
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
  },
  {
    timestamps: true,
  },
);

const CartItem = mongoose.model<CartItems>('CartItem', cartItemSchema);

export default CartItem;
