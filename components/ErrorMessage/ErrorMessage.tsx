import { useState, useEffect } from 'react';
const { AnimatePresence, motion } = require('framer-motion');
import globalStyles from './../../styles/Global.module.css';
import styles from './Styles.module.css';

const ErrorMessage: React.FC<{ message: string; show: boolean }> = ({
  show,
  message,
}) => {
  
  return (
    <div className={styles.errorContainer}>
      <AnimatePresence>
        {show && (
          <motion.h3
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className={`${globalStyles.center}`}
          >
            {message}
          </motion.h3>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ErrorMessage;
