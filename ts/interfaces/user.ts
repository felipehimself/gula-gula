export interface IUser {
  name: string;
  email: string;
  password: string;
  address: IAddress;
}

export interface IAddress {
  isAddressRegistered: boolean;
  city: string | null;
  street: string | null;
  number: number | null;
  zipCode: string | null;
  country: string | null;
  additional: string | null;
  district: string | null;
  federalUnit: string | null;
}
