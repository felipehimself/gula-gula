import React from 'react';
import styles from './Styles.module.css';

const ButtonLink: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  return <span className={styles.btnLink}>{children}</span>;
};
export default ButtonLink;
