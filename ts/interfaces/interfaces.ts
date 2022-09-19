export interface IProduct {
  code: string;
  name: string;
  itens: IItens[];
}

export interface IItens {
  id: string;
  code: string;
  description: string;
  details?: string;
  needChoices?: boolean;
  choices?: IChoices[];
  unitPrice: number;
  unitMinPrice: number;
  sellingOption?: ISellingOption;
  unitOriginalPrice?: number;
  productTags?: IProductTags[];
  productInfo?: IProductInfo;
  img: string;
  imgSmall: string;
}

export interface IProductTags {
  group: string;
  tags: string[];
}

export interface IProductInfo {
  id: string;
  quantity: number;
  unit: string;
}

export interface IChoices {
  code: string;
  name: string;
  min: number;
  max: number;
  garnishItens: IGarnishItens[];
}

export interface IGarnishItens {
  id: string;
  code: string;
  description: string;
  details: string;
  unitPrice: number;
  img: string;
}

export interface ISellingOption {
  minimum: number;
  incremental: number;
  availableUnits: string[];
}

export interface ICartItems {
  values: IOrder[];
  total: number;
  discount: number;
  cupom: null | string
}

export interface IOrder {
  product: string;
  notes?: string | null;
  options?: IOrderOptions[];
  totalQty: number;
  totalAmt: number;
  productId: string;
  orderId: string;
}

export interface IOrderOptions {
  option?: string;
  price?: number;
  id?: string;
}

export interface IChoose {
  product: string;
  notes: string | null;
  options: IOrderOptions[];
  productId: string;
  orderId: string;
}

export interface IPlaceOrder {
  customerId: string;
  products: IOrder[];
  total: number;
  discount: number | null;
  totalWithDiscount: number | null;
  cupom: string | null;
  paymentMethod: string;
}