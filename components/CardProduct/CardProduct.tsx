import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IItens } from '../../ts/interfaces/interfaces';
import { getNumberOfPeople } from '../../utils/functions';
import styles from './Styles.module.css';
import globalStyles from './../../styles/Global.module.css';

const { motion } = require('framer-motion');

const CardProduct: React.FC<{ product: IItens; id?: string }> = ({ product }) => {

  return (
    <Link href={`/product/${product.id}`} key={product.id}>
      <motion.article
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        className={styles.article}
      >
        <div className={styles.descriptionContainer}>
          <h3>{product.description}</h3>
          <p>{product.details}</p>

          {product?.productTags?.[0]?.tags && (
            <p className={`${globalStyles.colorGrey}`}>
              {getNumberOfPeople(product?.productTags?.[0]?.tags)}
            </p>
          )}

          {product.unitPrice > 1 ? (
            <div className={globalStyles.flexRow}>
              <p>R$ {product.unitPrice.toFixed(2) } </p>

              {product.unitOriginalPrice && (
                <p
                  className={`${globalStyles.lineThrough} ${globalStyles.colorGrey}`}
                >
                  R$ {product.unitOriginalPrice.toFixed(2)}
                </p>
              )}
            </div>
          ) : (
            <p>
              A partir de R$ {product.unitMinPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className={globalStyles.imageContainer}>
          <Image
            width={'100%'}
            height={'100%'}
            src={product.imgSmall}
            alt={product.description}
            objectFit='cover'
            layout='responsive'
          />
        </div>
      </motion.article>
    </Link>
  );
};
export default CardProduct;
