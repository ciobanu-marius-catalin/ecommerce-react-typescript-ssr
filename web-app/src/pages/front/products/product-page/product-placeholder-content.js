import { ProductContent } from './product-content';

function ProductContentPlaceholder(props) {
  return (
    <ProductContent
      {...props}
      className="ecommerce-product-page__container--show-placeholder"
    />
  );
}

export { ProductContentPlaceholder };
