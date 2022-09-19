import { useEffect, useState, useMemo } from 'react';
import { getFromSessionStorage } from '../features/cartSlice';
import { useAppDispatch } from '../store/store';

export const useGetSessionStorage = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartItems = window.sessionStorage.getItem('gula-gula-cart');

      if (cartItems) {
        const values = JSON.parse(cartItems).values;
        const total = JSON.parse(cartItems).total;
        const discount = JSON.parse(cartItems).discount;
        const cupom = JSON.parse(cartItems).cupom;

        dispatch(getFromSessionStorage({ values, total, discount, cupom }));
      }
    }
  }, [dispatch]);
};

export const useFixedNavBar = (): boolean => {
  const [fixedNav, setFixedNav] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', changeNavbar);

    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  }, []);

  const changeNavbar = () => {
    const scrollY = window.scrollY;
    if (scrollY >= 215) {
      setFixedNav(true);
    } else {
      setFixedNav(false);
    }
  };

  return fixedNav;
};

export const useGetBusinessTime = () => {
  const [isOpen, setIsOpen] = useState({ isOpen: false, state: 'Fechado' });
  const date = useMemo(() => new Date(), []);

  useEffect(() => {
    const weekDay = date.getDay();
    const hour = date.getHours();

    if (weekDay === 1) return setIsOpen({ isOpen: false, state: 'Fechado' });

    if (weekDay === 6 || weekDay === 0) {
      if (hour >= 11 && hour <= 23) {
        setIsOpen({ isOpen: true, state: 'Aberto' });
        return;
      }
      setIsOpen({ isOpen: false, state: 'Fechado' });
    } else {
      if (hour >= 11 && hour <= 21) {
        setIsOpen({ isOpen: true, state: 'Aberto' });
        return;
      }
    }
    setIsOpen({ isOpen: false, state: 'Fechado' });
  }, [date]);

  return isOpen;
};
