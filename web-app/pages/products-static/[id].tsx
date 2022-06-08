import { ProductPageStatic } from '@pages';
import { axios } from '@core';

export async function getStaticPaths() {
  const result = await axios.get('/products', {
    params: {
      page: 1,
      perPage: 50,
    },
  });
  const products = result?.data?.data || [];
  const paths = products.map(({ id }) => {
    return {
      params: { id: id + '' },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths,
    fallback: true,
    // fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { id } = params || {};

  const result = await axios.get(`/products/${id}`);
  const product = result?.data || {};
  console.log('generate product');
  return {
    props: { product },
    //The page will be recomputed after 12h has passed. Only at the next request
    revalidate: 60 * 60,
  };
}

export default ProductPageStatic;
