import { ProductsPageForm } from './form';
import { DashboardLayout } from '@layouts';

const ProductsPageAdd = () => {
  return (
    <ProductsPageForm
      localApiPath="/admin/products"
      listApiPath="/admin/products"
    />
  );
};

ProductsPageAdd.getLayout = DashboardLayout;

export { ProductsPageAdd };
