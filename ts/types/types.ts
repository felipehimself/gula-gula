import { IPlaceOrder } from '../interfaces/interfaces';
import { IUser, IAddress } from '../interfaces/user';

export type Login = { email: string; password: string };

export type SignUp = Login & { name: string };

export type LoggedUser = Omit<IUser, 'password'>;

export type FormUser = Omit<LoggedUser, 'address'> & Omit<IAddress, 'isAddressRegistered' | 'country'>;

export type MongoRes = { createdAt: string, updatedAt:string, _id: string }

export type Order = Partial<IPlaceOrder> & MongoRes