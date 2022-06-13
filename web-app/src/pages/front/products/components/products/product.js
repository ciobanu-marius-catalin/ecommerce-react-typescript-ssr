import { Button, Col } from 'react-bootstrap';
import _ from 'lodash';

import classnames from 'classnames';
import Link from 'next/link';

function Product({ data = {} }) {
  const { isPlaceholder } = data;

  const Content = isPlaceholder ? PlaceholderPost : PostContent;
  return (
    <Col xs={12} sm={6} md={3} className="p-2">
      <Content data={data} />
    </Col>
  );
}

function PostContent({ data = {} }) {
  const { thumbnail: url, price, title, id, isPlaceholder } = data;
  const link = `/${id}`;
  return (
    <div
      className={classnames('product-list-page__item', {
        'product-list-page__item--show-placeholder': isPlaceholder,
      })}
    >
      <div className="product-list-page__item__container">
        <Link href={link}>
          <a>
            <div className="product-list-page__item__image-outer">
              <div className="product-list-page__item__image-aspect-ratio">
                {url && <img src={url} alt="featured-image" />}
              </div>
            </div>
            <h2 className="product-list-page__item__title">{title}</h2>
          </a>
        </Link>
        <span className="product-list-page__item__price">{price} $</span>
        <Button>Add to cart</Button>
      </div>
    </div>
  );
}

function PlaceholderPost({ data = {} }) {
  const { id } = data;
  const link = `/${id}`;
  return (
    <div
      className={classnames(
        'product-list-page__item',
        'product-list-page__item--show-placeholder'
      )}
    >
      <Link href={link}>
        <a>
          <div className="product-list-page__item__image-outer">
            <div className="product-list-page__item__image-aspect-ratio" />
          </div>
          <h2 className="product-list-page__item__title" />
          <p className="product-list-page__item__description" />
        </a>
      </Link>
    </div>
  );
}

export { Product };
