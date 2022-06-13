import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useProductRepository } from '../../../../repositories';

function useFetchData({ setError = _.noop } = {}) {
  const router = useRouter();
  const { id } = router.query;
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  const repository = useProductRepository();
  async function fetchData() {
    setIsLoading(true);
    try {
      const fetchedData = await repository.getItem(id);
      if (fetchedData) {
        setData(fetchedData);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  return { data, isLoading };
}

export { useFetchData };
