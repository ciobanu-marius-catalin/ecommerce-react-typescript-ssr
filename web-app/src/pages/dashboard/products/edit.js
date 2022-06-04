import { ProductsPageForm, settings } from './form';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@layouts';
import { useMemo } from 'react';

const editSettings = settings;

const ProductsPageEdit = () => {
  const router = useRouter();
  let fullPath = router.asPath;
  let id = useMemo(() => {
    try {
      let search = fullPath.split('?')[1];
      const urlSearchParams = new URLSearchParams(search);
      id = urlSearchParams.get('id');
      return id;
    } catch (e) {}
  }, [fullPath]);

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
