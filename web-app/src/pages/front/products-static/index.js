import { List } from './components';
import { FrontendLayout } from '@layouts';
import { ProductsPageWrapper } from '../products/components';

const ProductsStaticPage = ({ products, nrOfPages }) => {
  return (
    <ProductsPageWrapper>
      <List products={products} nrOfPages={nrOfPages} />
    </ProductsPageWrapper>
  );
};

ProductsStaticPage.getLayout = FrontendLayout;

export * from './product-page';
export { ProductsStaticPage };
