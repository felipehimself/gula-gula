import { useState } from 'react';
import styles from './Styles.module.css';
import Link from 'next/link';
import { FiLogIn, FiLogOut, FiUser, FiBookOpen } from 'react-icons/fi';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loading-icons';
import { cleanSessionStorage } from '../../utils/functions';

const BottomTab: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post<{ success: boolean }, AxiosResponse>(
        '/api/auth/logout',
        { key: 'static_key' }
      );
        
      cleanSessionStorage()
      router.reload();
    } catch (error) {

      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.innerContainer}>
        <Link href='/'>
          <a style={{pointerEvents: isLoading ? 'none' : 'auto'}} className={styles.link}>
            <FiBookOpen /> Menu
          </a>
        </Link>

        <div className={styles.link}>
          {isLoggedIn && 
            <Link href='/account/my-account'>
              <a style={{pointerEvents: isLoading ? 'none' : 'auto'}} className={styles.link}>
               {isLoading ? <ThreeDots height={10} fill='#000' stroke='#000' /> : <> <FiUser /> Minha Conta </> } 
              </a>
            </Link>
          }
        </div>

        {isLoggedIn ? (
          <button style={{pointerEvents: isLoading ? 'none' : 'auto'}} disabled={isLoading} onClick={handleLogout} className={styles.logOut}>
            <span className={styles.link}>
              <FiLogOut /> Logout
            </span>
          </button>
        ) : (
          <Link href='/auth/login'>
            <a style={{pointerEvents: isLoading ? 'none' : 'auto'}} className={styles.link}>
              <FiLogIn /> Login
            </a>
          </Link>
        )}
      </div>
    </footer>
  );
};
export default BottomTab;
