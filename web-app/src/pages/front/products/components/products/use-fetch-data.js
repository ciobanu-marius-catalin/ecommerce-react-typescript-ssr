import { useEffect, useRef, useState } from 'react';
import { useProductRepository } from '../../../../../repositories';

function useFetchData({ setError, perPage = 9, page = 1 }) {
  let [data, setData] = useState([]);
  let [nrOfPages, setNrOfPages] = useState(0);
  const isLoading = useRef(false);
  const productsRepository = useProductRepository();
  async function fetchData() {
    try {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;
      let { data: fetchedData, nrOfPages } = await productsRepository.get({
        perPage,
        page,
      });

      if (fetchedData) {
        setData(fetchedData);
      }

      if (nrOfPages) {
        setNrOfPages(nrOfPages);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      isLoading.current = false;
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return { data, nrOfPages };
}

export { useFetchData };
