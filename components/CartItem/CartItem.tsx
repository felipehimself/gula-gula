import { decreaseItem, increaseItem, removeFromCart } from '../../features/cartSlice';
import { useAppDispatch } from '../../store/store';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { IOrder } from '../../ts/interfaces/interfaces';
import { notify } from '../../lib/hotToast';

import globalStyles from '../../styles/Global.module.css';
import styles from './Styles.module.css';

const CartItem: React.FC<{
  item: IOrder;
  index?: number;
  isEditable?: boolean;
}> = ({ item, isEditable, index }) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (id: string): void => {
    dispatch(removeFromCart({ orderId: id }));
  };

  const handleDecreaseItem = (id: string) => {
    dispatch(decreaseItem({ orderId: id }));
    notify('Produto removido');
  };

  const handleIncreaseItem = (id: string) => {
    dispatch(increaseItem({ orderId: id }));
    notify('Produto adicionado');
  };

  return (
    <div
      className={`${styles.itensContainer}`}
      key={item.orderId}
    >
      <div className={`${globalStyles.flexRowBetween} ${globalStyles.paddingHorizontal}`}>
        {isEditable? <h4>
          {item.product} - R$ {(item.totalAmt / item.totalQty).toFixed(2)}
        </h4> : <p>{item.product} - R$ {(item.totalAmt / item.totalQty).toFixed(2)}</p> }
        
        {isEditable ? (
          <div className={globalStyles.flexRow}>
            {item.totalQty > 1 ? (
              <button aria-label='Diminuir um' onClick={() => handleDecreaseItem(item.orderId)}>
                <FiMinus color='#000' size={18} />
              </button>
            ) : (
              <button aria-label='Excluir item' onClick={() => handleRemoveFromCart(item.orderId)}>
                <FiTrash2 color='#f03e3e' />
              </button>
            )}

            <span className={styles.quantity}>{item.totalQty}</span>
            <button aria-label='Adicionar um' onClick={() => handleIncreaseItem(item.orderId)}>
              <FiPlus color='#000' size={18} />
            </button>
          </div>
        ) : <span>x {item.totalQty}</span>}
      </div>
      <ul className={styles.list}>
        {item.options?.map((option) => {
          return (
            <li className={styles.listItem} key={option.id}>
              <span>{option.option}</span>
              <span>{option.price === 0 ? '-' : 'R$ ' + option?.price?.toFixed(2)}</span>
            </li>
          );
        })}
      </ul>

      {isEditable && (
      <div className={globalStyles.paddingHorizontal}>
        <p className={styles.notes}>
          {item.notes ? 'Observações:' : 'Sem observações'}
        </p>
        <p> {item.notes && item.notes}</p>
      </div>

      ) }
      <div className={`${globalStyles.flexRowBetween} ${styles.spacingTopBot} ${globalStyles.paddingHorizontal}`}>
        <p>Sub total</p>
        <p>R$ {item.totalAmt.toFixed(2)}</p>
      </div>
    </div>
  );
};
export default CartItem;
