import { Schema, Model } from 'mongoose';
import createModel from './../lib/createModel';
import { IPlaceOrder} from '../ts/interfaces/interfaces';

type OrderModel = Model<IPlaceOrder>;

const orderSchema = new Schema<IPlaceOrder, OrderModel>(
  {
    customerId: { type: String, required: true },
    total: { type: Number, required: true },
    discount: { type: Number, required: false, default: null },
    totalWithDiscount: { type: Number, required: false, default: null },
    cupom: { type: String, required: false, default: null },
    paymentMethod: { type: String, required: true },
    products: {
      type: [
        {
          product: { type: String, required: true },
          notes: { type: String, required: false, default: null },
          totalQty: { type: Number, required: true },
          totalAmt: { type: Number, required: true },
          productId: { type: String, required: true },
          orderId: { type: String, required: true },
          options: {
            type: [
              {
                option: { type: String, required: false },
                price: { type: Number, required: false },
                id: { type: String, required: false },
              },
            ],
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default createModel<IPlaceOrder, OrderModel>('Order', orderSchema);
