import { List, ProductsPageWrapper } from './components';
import { FrontendLayout } from '@layouts';

const ProductsPage = () => {
  return (
    <ProductsPageWrapper>
      <List />
    </ProductsPageWrapper>
  );
};

ProductsPage.getLayout = FrontendLayout;

export * from './product-page';
export { ProductsPage };
