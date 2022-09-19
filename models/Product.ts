import { Schema, Model } from 'mongoose';
import createModel from '../lib/createModel';
import { IProduct } from '../ts/interfaces/interfaces';

type ProductModel = Model<IProduct>;

const productSchema = new Schema<IProduct, ProductModel>({
  code: { type: String, required: true },
  name: { type: String, required: true },
  itens: {
    type: [
      {
        id: { type: String, required: false },
        code: { type: String, required: false },
        description: { type: String, required: false },
        details: { type: String, required: false },
        needChoices: { type: Boolean, required: false, default: false },
        choices: {
          type: [
            {
              code: { type: String, required: false },
              name: { type: String, required: false },
              min: { type: Number, required: false },
              max: { type: Number, required: false },
              garnishItens: {
                type: [
                  {
                    id: { type: String, required: false },
                    code: { type: String, required: false },
                    description: { type: String, required: false },
                    details: { type: String, required: false },
                    unitPrice: { type: Number, required: false },
                    img: { type: String, required: false },
                  },
                ],
              },
            },
          ],
        },
        unitPrice: { type: Number, required: true },
        unitMinPrice: { type: Number, required: true },
        sellingOption: {
          minimum: { type: Number, required: false },
          incremental: { type: Number, required: false },
          availableUnits: [
            {
              type: String,
              required: false,
            },
          ],
        },
        unitOriginalPrice: { type: Number, required: false },
        productTags: {
          type: [
            {
              group: { type: String, required: false },
              tags: [
                {
                  type: String,
                  required: false,
                },
              ],
            },
          ],
        },
        productInfo: {
          id: { type: String, required: false },
          quantity: { type: Number, required: false },
          unit: { type: String, required: false },
        },
        img: { type: String, required: false },
        imgSmall: { type: String, required: false },
      },
    ],
  },
});

export default createModel<IProduct, ProductModel>('Product', productSchema);
