import { useEffect, useState, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Product } from './product';
import { useErrorCatcher } from '@core';
import { useFetchData } from './use-fetch-data';
import { CrudTablePagination } from '@components';

const itemsPerPage = 16;

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
    <Container className="product-list-page">
      <Row>
        {/*<InfiniteScroll*/}
        {/*  dataLength={items.length}*/}
        {/*  next={fetchInfiniteScrollData}*/}
        {/*  hasMore={page !== nrOfPages - 1}*/}
        {/*  scrollThreshold="0.7"*/}
        {/*  // loader={<h4>Loading...</h4>}*/}
        {/*  // endMessage={*/}
        {/*  //     <p style={{ textAlign: "center" }}>*/}
        {/*  //         <b>Yay! You have seen it all</b>*/}
        {/*  //     </p>*/}
        {/*  // }*/}
        {/*>*/}
        {/*</InfiniteScroll>*/}
        {items.map((post, index) => {
          return <Product key={index} data={post} />;
        })}
        <CrudTablePagination
          activePage={page}
          setPage={setPage}
          nrOfPages={nrOfPages}
        />
      </Row>
    </Container>
  );
}

export { List };
