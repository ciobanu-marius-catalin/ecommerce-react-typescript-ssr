import { ProductsPageForm, settings } from './form';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@layouts';
import { useMemo } from 'react';

const editSettings = settings;

const ProductsPageEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <></>;
  }

  let localApiPath = `/admin/products/${id}`;
  return (
    <ProductsPageForm
      settings={editSettings}
      localApiPath={localApiPath}
      listApiPath={'/admin/products'}
      loadData={true}
      method={'put'}
    />
  );
};

ProductsPageEdit.getLayout = DashboardLayout;

export { ProductsPageEdit };
