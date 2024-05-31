import mongoose, { Schema } from 'mongoose';
import Cart from '../../domain/model/Cart';

const cartSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
    },
    userID: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model<Cart>('Cart', cartSchema);

export default Cart;
