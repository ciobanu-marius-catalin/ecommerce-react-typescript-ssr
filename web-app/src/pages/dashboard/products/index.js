import { CrudTable } from '@components';
import { DashboardLayout } from '@layouts';

const ProductsPage = () => {
  let columnNames = ['id', 'title', 'price'];
  return <CrudTable localApiPath="/admin/products" columnNames={columnNames} />;
};

ProductsPage.getLayout = DashboardLayout;

export * from './edit';
export * from './add';
export { ProductsPage };
