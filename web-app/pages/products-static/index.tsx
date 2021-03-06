import { ProductsStaticPage } from '@pages';
import { axios } from '@core';

export async function getServerSideProps({ query  }) {
  const { page = 1 } = query || {};

  const perPage = 12;
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
