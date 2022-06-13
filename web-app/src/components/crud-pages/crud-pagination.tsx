//https://thumbs.dreamstime.com/b/pagination-bar-vector-page-navigation-web-buttons-pagination-bars-vector-templates-web-page-navigation-interface-buttons-118842162.jpg

import { Pagination } from 'react-bootstrap';
import _ from 'lodash';
import { useDeepMemo } from '@core';
import { FC, ReactElement } from 'react';

interface CrudTablePaginationProps {
  activePage: number | string;
  setPage?: Function;
  nrOfPages?: number;
}
interface GetSimplePaginationFunctionParams {
  activePage: number;
  setPage: Function;
  nrOfPages: number;
}

interface GetComplexPaginationFunctionParams {
  activePage: number;
  setPage: Function;
  firstPage: number;
  lastPage: number;
}

interface GetPaginationFunctionParams
  extends GetSimplePaginationFunctionParams,
    GetComplexPaginationFunctionParams {}

type GetPaginationFunctionType = (
  params: GetPaginationFunctionParams
) => ReactElement[];

const CrudTablePagination: FC<CrudTablePaginationProps> = ({
  activePage = 1,
  setPage = _.noop,
  nrOfPages = 0,
}) => {
  // @ts-ignore
  activePage = parseInt(activePage);
  if (nrOfPages < 2) {
    return <></>;
  }
  let items: ReactElement[] = [];
  const firstPage = 1;
  const lastPage = nrOfPages;

  const props: GetPaginationFunctionParams = {
    nrOfPages,
    activePage,
    firstPage,
    setPage,
    lastPage,
  };
  if (nrOfPages < 2) {
    items = getBasicPagination(props);
  } else {
    items = getComplexPagination(props);
    //if(activePage === 1)
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
};

type GetBasicPaginationType = (
  props: GetSimplePaginationFunctionParams
) => ReactElement[];

const getBasicPagination: GetBasicPaginationType = ({
  activePage,
  nrOfPages,
  setPage,
}) => {
  const items = [];
  for (let i = 1; i <= nrOfPages; i++) {
    const isActive = i === activePage;
    items.push(
      <Pagination.Item key={i} active={isActive} onClick={() => setPage(i)}>
        {i}
      </Pagination.Item>
    );
  }
  return items;
};

type GetComplexPaginationType = (
  props: GetComplexPaginationFunctionParams
) => ReactElement[];

const getComplexPagination: GetComplexPaginationType = ({
  activePage,
  firstPage,
  lastPage,
  setPage,
}) => {
  const ELLIPSIS_ELEMENT = 'ellipsisElement';
  const nrOfVisibleItems = 3;
  let nrOfLeftItems = Math.floor(nrOfVisibleItems / 2);
  let nrOfRightItems = Math.floor(nrOfVisibleItems / 2);
  let indexWithExtraPagination;

  //for example you are on the second element 2 - 2 = 0 < 1. difference = 1 - 0 = 1;
  //for example you are on the first element  1 - 2 = -1 < 1. the difference is 1 - (-1) = 2
  if ((indexWithExtraPagination = activePage - nrOfLeftItems) < firstPage) {
    const difference = firstPage - indexWithExtraPagination;
    nrOfLeftItems -= Math.min(difference, firstPage);
    nrOfRightItems += difference;
  }

  //for example if we have 50 elements on page 49 we'll have 49 + 2 = 51 the difference is 51 - 50 = 1;
  if ((indexWithExtraPagination = activePage + nrOfRightItems) > lastPage) {
    const difference = indexWithExtraPagination - lastPage;
    nrOfLeftItems += difference;
    nrOfRightItems -= difference;
  }
  const indexes = [];

  let currentActivePage = activePage - nrOfLeftItems;
  for (let i = 0; i < nrOfLeftItems; i++) {
    const index = currentActivePage++;

    if (index >= firstPage) {
      indexes.push(index);
    }
  }

  indexes.push(activePage);

  currentActivePage = activePage;
  for (let i = 0; i < nrOfRightItems; i++) {
    const index = ++currentActivePage;
    if (index <= lastPage) {
      indexes.push(index);
    }
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

  const items = useDeepMemo(() => {
    return indexes.map((index, position) => {
      const keyId = Math.random();
      const isActive = index === activePage;
      const isEllipsis = index === ELLIPSIS_ELEMENT;
      let component;
      if (isEllipsis) {
        const key = `${keyId}-e-${position}`;
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
};

export { CrudTablePagination };
