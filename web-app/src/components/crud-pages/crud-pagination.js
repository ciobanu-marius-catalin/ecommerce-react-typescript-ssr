//https://thumbs.dreamstime.com/b/pagination-bar-vector-page-navigation-web-buttons-pagination-bars-vector-templates-web-page-navigation-interface-buttons-118842162.jpg

import { Pagination } from 'react-bootstrap';
import _ from 'lodash';
import { useDeepMemo } from '@core';

function CrudTablePagination({
  activePage = null,
  setPage = _.noop,
  nrOfPages = 0,
} = {}) {
  activePage = parseInt(activePage);
  if (nrOfPages < 2) {
    return <></>;
  }
  let items = [];
  let firstPage = 1;
  let lastPage = nrOfPages;

  if (nrOfPages < 2) {
    items = getBasicPagination();
  } else {
    items = getComplexPagination();
    //if(activePage === 1)
  }
  function getBasicPagination() {
    let items = [];
    for (let i = 1; i <= nrOfPages; i++) {
      let isActive = i === activePage;
      items.push(
        <Pagination.Item key={i} active={isActive} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return items;
  }

  function getComplexPagination() {
    const ELLIPSIS_ELEMENT = 'ellipsisElement';
    let nrOfVisibleItems = 3;
    let nrOfLeftItems = Math.floor(nrOfVisibleItems / 2);
    let nrOfRightItems = Math.floor(nrOfVisibleItems / 2);
    let indexWithExtraPagination;

    //for example you are on the second element 2 - 2 = 0 < 1. difference = 1 - 0 = 1;
    //for example you are on the first element  1 - 2 = -1 < 1. the difference is 1 - (-1) = 2
    if ((indexWithExtraPagination = activePage - nrOfLeftItems) < firstPage) {
      let difference = firstPage - indexWithExtraPagination;
      nrOfLeftItems -= difference;
      nrOfRightItems += difference;
    }

    //for example if we have 50 elements on page 49 we'll have 49 + 2 = 51 the difference is 51 - 50 = 1;
    if ((indexWithExtraPagination = activePage + nrOfRightItems) > lastPage) {
      let difference = indexWithExtraPagination - lastPage;
      nrOfLeftItems += difference;
      nrOfRightItems -= difference;
    }
    let indexes = [];

    let currentActivePage = activePage - nrOfLeftItems;
    for (let i = 0; i < nrOfLeftItems; i++) {
      let index = currentActivePage++;
      indexes.push(index);
    }

    indexes.push(activePage);

    currentActivePage = activePage;
    for (let i = 0; i < nrOfRightItems; i++) {
      let index = ++currentActivePage;
      indexes.push(index);
    }

    if (!indexes.includes(firstPage)) {
      if (firstPage + 1 !== indexes[0]) {
        indexes.unshift(ELLIPSIS_ELEMENT);
      }

      indexes.unshift(firstPage);
    }
    if (!indexes.includes(lastPage)) {
      if (lastPage - 1 !== indexes[indexes.length - 1]) {
        indexes.push(ELLIPSIS_ELEMENT);
      }

      indexes.push(lastPage);
    }

    let items = useDeepMemo(() => {
      return indexes.map((index, position) => {
        const keyId = Math.random();
        const isActive = index === activePage;
        let isEllipsis = index === ELLIPSIS_ELEMENT;
        let component;
        if (isEllipsis) {
          let key = `${keyId}-e-${position}`;
          component = <Pagination.Ellipsis key={key} />;
        } else {
          component = (
            <Pagination.Item
              key={keyId + index}
              active={isActive}
              onClick={() => setPage(index)}
            >
              {index}
            </Pagination.Item>
          );
        }

        return <>{component}</>;
      });
    }, [indexes, activePage]);
    return items;
  }
  const onPrevious = () => {
    if (activePage > firstPage) {
      setPage(activePage - 1);
    }
  };
  const onNext = () => {
    if (activePage < lastPage) {
      setPage(activePage + 1);
    }
  };
  return (
    <Pagination>
      <Pagination.Prev onClick={onPrevious} />
      {items}
      <Pagination.Next onClick={onNext} />
    </Pagination>
  );
}
export { CrudTablePagination };
