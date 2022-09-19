import { Schema, Model } from 'mongoose';
import createModel from './../lib/createModel';
import { IUser } from '../ts/interfaces/user';

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: {
      isAddressRegistered: { type: Boolean, required: false, default: false },
      city: { type: String, required: false, default: null },
      street: { type: String, required: false, default: null },
      zipCode: { type: String, required: false, default: null },
      additional: { type: String, required: false, default: null },
      district: { type: String, required: false, default: null },
      number: { type: Number, required: false, default: null },
      federalUnit: { type: String, required: false, default: null },
    },
  },
  {
    timestamps: true,
  }
);

export default createModel<IUser, UserModel>('User', userSchema);
