import { useRouter } from 'next/router';
import { ListContent } from '../../../products/components/products/list-content';

function List({ products: items, nrOfPages }) {
  const router = useRouter();

  let { page = 1 } = router.query;
  const setPage = (page) => {
    router.query.page = page;
    router.push(router);
  };

  return (
    <ListContent
      items={items}
      page={page}
      setPage={setPage}
      nrOfPages={nrOfPages}
    />
  );
}

export { List };
