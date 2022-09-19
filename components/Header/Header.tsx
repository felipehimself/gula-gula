import styles from './Styles.module.css';
import Link from 'next/link';
import {FiSearch} from 'react-icons/fi'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1>gula-gula</h1>
        <Link href='/search' >
          <a className={styles.button} aria-label="Pesquisar">
            <FiSearch color='white' size={18} />
          </a>
        </Link>
      </div>
    </header>
  );
};
export default Header;
