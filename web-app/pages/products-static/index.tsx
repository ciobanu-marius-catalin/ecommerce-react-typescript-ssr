import { ProductsStaticPage } from '@pages';
import { axios } from '@core';

export async function getServerSideProps({ query  }) {
  const { page = 1 } = query || {};
  console.log('page params are', query);
  const perPage = 10;
  const result = await axios.get('/products', {
    params: {
      page,
      perPage,
    },
  });
  const { data: products, nrOfPages } = result?.data || {};

  return {
    props: { products, nrOfPages },
  };
}

export default ProductsStaticPage;
