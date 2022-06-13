import { CrudTable } from '@components';
import { DashboardLayout } from '@layouts';

const AdminProductsPage = () => {
  let columnNames = ['id', 'title', 'price'];
  return <CrudTable localApiPath="/admin/products" columnNames={columnNames} />;
};

AdminProductsPage.getLayout = DashboardLayout;

export * from './edit';
export * from './add';
export { AdminProductsPage };
