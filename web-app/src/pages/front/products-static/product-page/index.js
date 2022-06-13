import { FrontendLayout } from '@layouts';
import { ProductPageWrapper } from '../../products/product-page/product-page-wrapper';

function ProductPageStatic({ product }) {
  return <ProductPageWrapper data={product} />;
}

ProductPageStatic.getLayout = FrontendLayout;

export { ProductPageStatic };
