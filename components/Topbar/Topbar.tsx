import styles from './Styles.module.css';
import {FiArrowLeft} from 'react-icons/fi'
import { useRouter } from 'next/router';
import globalStyles from './../../styles/Global.module.css';

const Topbar = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className={globalStyles.fixedContainer}>
      <div className={styles.innerContainer}>
        <button aria-label='Voltar' className={styles.button} onClick={() => router.back()}>
          <FiArrowLeft size={20} style={{ cursor: 'pointer' }} />
        </button>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  );
};
export default Topbar;
