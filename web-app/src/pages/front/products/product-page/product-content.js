import moment from 'moment';
import { Button, Col, Row } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './_style.module.scss';

function ProductContent({ data, className }) {
  const { thumbnail: url, description, title, price, category } = data;

  const formattedPrice = price ? `${price} $` : null;

  return (
    <div
      className={classnames(
        styles['ecommerce-product-page__container'],
        className
      )}
    >
      <Row className={`${styles['ecommerce-product-page']} g-0`}>
        <Col
          className={styles['ecommerce-product-page__image__outer']}
          xs={12}
          md={4}
        >
          {url && <img src={url} alt="featured-image" loading="lazy" />}
        </Col>
        <Col className={styles['ecommerce-product-page__right-side']}>
          <h1 className={styles['ecommerce-product-page__title']}>{title}</h1>

          <span className={styles['ecommerce-product-page__price']}>
            {formattedPrice}
          </span>
          <p className={styles['ecommerce-product-page__description']}>
            {description}
          </p>

          <Button className={styles['ecommerce-product-page__add-to-cart']}>
            Add to cart
          </Button>

          <span className={styles['ecommerce-product-page__category']}>
            {category && (
              <span>
                Categories:{' '}
                <span
                  className={styles['ecommerce-product-page__category__item']}
                >
                  {category}
                </span>
              </span>
            )}
          </span>
        </Col>
      </Row>
    </div>
  );
}

export { ProductContent };
