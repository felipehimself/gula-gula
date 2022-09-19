import styles from './Styles.module.css';
import { Oval } from 'react-loading-icons';

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
      <Oval fill='transparent' stroke='#000' height='8rem'/>
    </div>
  );
};
export default Loading;
