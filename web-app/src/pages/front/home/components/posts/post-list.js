import { useEffect, useState, useRef } from 'react';
import { axios } from '@core';
import _ from 'lodash';
import { Container, Row } from 'react-bootstrap';
import { Post } from './post';
import { useErrorCatcher } from '@core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useProductRepository } from '../../../../../repositories';

const initialItemsPerPage = 18;

const placeholderItems = Array(initialItemsPerPage).fill({
  isPlaceholder: true,
});

function PostList() {
  const [page, setPage] = useState(1);
  const fetchQueue = useRef({
    position: 1,
    key: Math.random(),
  });
  const [, setRandomKey] = useState();
  const forceRefresh = () => {
    setRandomKey(Math.random());
  };
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  function addToFetchQueue() {
    fetchQueue.current = {
      position: fetchQueue.current.position + 1,
      key: Math.random(),
    };
    forceRefresh();
  }
  function removeFromFetchQueue() {
    fetchQueue.current = {
      position: fetchQueue.current.position - 1,
      key: Math.random(),
    };
    forceRefresh();
  }
  const { setError } = useErrorCatcher();
  let { data, nrOfPages } = useFetchData({
    setError,
    page,
    perPage: itemsPerPage,
    fetchQueue,
    removeFromFetchQueue,
    setPage,
  });

  let items = data;
  if (_.isEmpty(data)) {
    items = placeholderItems;
  }

  function fetchInfiniteScrollData() {
    addToFetchQueue();
  }

  return (
    <Container className="post-list-page">
      <Row>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchInfiniteScrollData}
          hasMore={page !== nrOfPages - 1}
          scrollThreshold="0.7"
          // loader={<h4>Loading...</h4>}
          // endMessage={
          //     <p style={{ textAlign: "center" }}>
          //         <b>Yay! You have seen it all</b>
          //     </p>
          // }
        >
          {items.map((post, index) => {
            return <Post key={index} data={post} />;
          })}
        </InfiniteScroll>
      </Row>
    </Container>
  );
}

function useFetchData({
  setError,
  perPage = 9,
  page = 1,
  fetchQueue,
  removeFromFetchQueue,
  setPage,
}) {
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
        let newData = data.concat(fetchedData);
        setData(newData);
      }

      if (nrOfPages) {
        setNrOfPages(nrOfPages);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      isLoading.current = false;

      removeFromFetchQueue();
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (isLoading.current || fetchQueue.current.position === 0) {
      return;
    }
    setPage(page + 1);
  }, [JSON.stringify(fetchQueue.current)]);

  return { data, nrOfPages };
}

export { PostList };
