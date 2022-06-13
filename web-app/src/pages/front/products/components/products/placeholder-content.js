import classnames from 'classnames';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { ProductContent } from './product-content';

function PlaceholderContent(props) {
  return (
    <ProductContent
      className="product-list-page__item--show-placeholder"
      {...props}
    />
  );
}

export { PlaceholderContent };
