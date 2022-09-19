import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { formatMoney } from '../../utils/functions';

import { FiShoppingCart } from 'react-icons/fi';
import styles from './Styles.module.css';

import { cartBarContainer } from '../../lib/framerMotion';
const { motion } = require('framer-motion');


const OrderBar = () => {
  const { values } = useSelector((state: RootState) => state.cart);

  const totalAmount = values.reduce((prev, curr) => prev + curr.totalAmt, 0);
  const totalQty = values.reduce((prev, curr) => prev + curr.totalQty, 0);

  return (
    <>
      {values.length > 0 && (
        <div className={styles.container}>
          <Link href={'/cart'}>
            <motion.div
              variants={cartBarContainer}
              initial='hidden'
              animate='visible'
              className={styles.innerContainer}
            >
              <div
                data-quantity={totalQty}
                className={styles.quantityContainer}
              >
                <FiShoppingCart size={18} />
              </div>
              <span className={styles.centerText}>Meu Pedido</span>
              <span>R$ {totalAmount.toFixed(2)}</span>
            </motion.div>
          </Link>
        </div>
      )}
    </>
  );
};
export default OrderBar;
