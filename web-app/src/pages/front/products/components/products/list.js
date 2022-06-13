import { useEffect, useState, useRef } from 'react';
import { useErrorCatcher } from '@core';
import { useFetchData } from './use-fetch-data';
import { ListContent } from './list-content';

const itemsPerPage = 12;

function List() {
  const [page, setPage] = useState(1);

  const { setError } = useErrorCatcher();
  let { data: items, nrOfPages } = useFetchData({
    setError,
    page,
    perPage: itemsPerPage,
    setPage,
  });

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
