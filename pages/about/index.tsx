import type { NextPage } from 'next';
import Head from 'next/head';
import Topbar from '../../components/Topbar/Topbar';
import globalStyles from './../../styles/Global.module.css';
import styles from './../../styles/About.module.css';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sobre</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Topbar title='Sobre' />

      <div className={`${globalStyles.customBackground} ${globalStyles.spacing} ${styles.aboutContainer}`}>
        <div className={`${globalStyles.container} ${styles.flexColumn}`}>
          <div>
            <h2 className={styles.heading}>
              Horário de funcionamento 
            </h2>

            <ul className={styles.list}>
              <li><span>Terça-feira à Sexta-feira:</span> 11h às 21h</li>
              <li><span>Sábado e Domingo:</span> 11h às 23h</li>
            </ul>
      
          </div>
          <div>
            <h2 className={styles.heading}>
              Formas de pagamento 
            </h2>
            <ul className={styles.list}>
              <li>Crédito</li>
              <li>Débito</li>
              <li>Dinheiro</li>
              <li>VR</li>
              <li>PIX</li>
            </ul>
      
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
