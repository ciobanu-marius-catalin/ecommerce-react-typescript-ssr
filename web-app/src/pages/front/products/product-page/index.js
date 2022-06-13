import { FrontendLayout } from '@layouts';
import { useFetchData } from './use-fetch-data';

import { ProductPageWrapper } from './product-page-wrapper';

function ProductPage() {
  const { data } = useFetchData();

  return <ProductPageWrapper data={data} />;
}

ProductPage.getLayout = FrontendLayout;

export { ProductPage };
