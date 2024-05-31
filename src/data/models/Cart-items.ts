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
    item: {
      _id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      cover: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
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
