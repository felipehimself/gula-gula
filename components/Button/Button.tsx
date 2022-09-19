import React from 'react';
import styles from './Styles.module.css';

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  flat?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined

}
const Button: React.FC<Props> = ({ children, disabled, type, flat, onClick }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${styles.btn} ${flat ? styles.btnFlat : styles.btnFilled} ${disabled ? styles.dissabled : undefined} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
