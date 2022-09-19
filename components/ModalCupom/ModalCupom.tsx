import React, { SetStateAction, useState } from 'react';
import Button from '../Button/Button';

import styles from './Styles.module.css';
import globalStyles from './../../styles/Global.module.css';

const { motion } = require('framer-motion');
import { Toaster } from 'react-hot-toast';
import { notify } from '../../lib/hotToast';

import { modalContentVariants } from '../../lib/framerMotion';
import { modalVariants } from '../../lib/framerMotion';
import { useAppDispatch } from '../../store/store';
import { addCupom } from '../../features/cartSlice';

const ModalCupom: React.FC<{
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [cupom, setCupom] = useState('');
  const [err, setErr] = useState('');

  const dispatch = useAppDispatch();

  const handleAddCupom = () => {

    if (cupom.toUpperCase() === 'OFF5') {
      dispatch(addCupom('OFF5'));
      setShowModal(false);
      notify('Cupom aplicado');

    } else {
      setErr('Cupom inválido');
    }
  };

  return (
    <>
      <Toaster
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      />

      <motion.div
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={`${globalStyles.overlay} ${styles.modal}`}
        onClick={() => setShowModal(false)}
      >
        <motion.div
          variants={modalContentVariants}
          className={styles.modalContent}
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2 className={globalStyles.center}>Cupom de desconto</h2>
          <p className={globalStyles.center}>
            Digite o código do cupom para validar seu desconto
          </p>
          <div className={styles.inputContainer}>
            <input
              onChange={(e) => setCupom(e.target.value)}
              type='text'
              name='cupom'
              className={styles.input}
              placeholder='Ex.: OFF5'
            />
            <small className={styles.error}>{err}</small>
          </div>
          <div>
            <Button onClick={handleAddCupom} type='button'>
              Aplicar Cupom
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
export default ModalCupom;
