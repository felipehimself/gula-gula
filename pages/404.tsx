import { NextPage } from 'next';
import Link from 'next/link';
import styles from './../styles/NotFound.module.css';

const NotFound: NextPage = () => {
  return (
    <div className={styles.notFoundContainer}>
        <h3>Parece que esta página não existe.</h3>
        <Link href='/'>
          <a className={styles.notFoundBtn}>Home</a>
        </Link>
    </div>
  );
};
export default NotFound;
