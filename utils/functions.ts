import { ICartItems, IItens } from '../ts/interfaces/interfaces';
import { useAppDispatch } from '../store/store';
import { getFromSessionStorage } from '../features/cartSlice';
import { useEffect } from 'react';

export const getNumberOfPeople = (arr: string[]) => {
  const [str] = arr;
  return str.includes('SERVES')
    ? `Serve até  ${str.slice(-1)} pessoas`
    : undefined;
};

export const formatMoney = (num: number) => {
  const money = new Intl.NumberFormat('br-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);

  return money;
};

export const getInitialValue = (obj: IItens): number => {
  if (obj.needChoices && obj.sellingOption?.minimum == 0) {
    return obj.unitPrice;
  } else if (obj.needChoices) {
    return 0;
  }

  return obj.unitPrice;
};

export const saveToSessionStorage = (data: ICartItems) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem('gula-gula-cart', JSON.stringify(data));
  }
};

export const cleanSessionStorage = () => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem('gula-gula-cart');
  }
};

export const formatDate = (date: string) => {
  return date.split('T')[0].split('-').reverse().join('/');
};

