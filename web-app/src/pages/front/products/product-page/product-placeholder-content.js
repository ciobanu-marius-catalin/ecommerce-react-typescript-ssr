import { ProductContent } from './product-content';
import styles from './_style.module.scss';

function ProductContentPlaceholder(props) {
  return (
    <ProductContent
      {...props}
      className={styles['ecommerce-product-page__container--show-placeholder']}
    />
  );
}

export { ProductContentPlaceholder };
