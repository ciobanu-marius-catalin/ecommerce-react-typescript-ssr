import { useEffect, useState, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Product } from './product';
import { useErrorCatcher } from '@core';
import { useFetchData } from './use-fetch-data';
import { CrudTablePagination } from '@components';
import { useRouter } from 'next/router';

function List({ products: items, nrOfPages }) {
  const { setError } = useErrorCatcher();
  // let { data: items, nrOfPages } = useFetchData({
  //   setError,
  //   page,
  //   perPage: itemsPerPage,
  //   setPage,
  // });
  const router = useRouter();

  let { page = 1 } = router.query;
  const setPage = (page) => {
    router.query.page = page;
    router.push(router);
  };

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
