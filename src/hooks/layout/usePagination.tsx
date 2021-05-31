import React, { useState } from 'react';
import Pagination from '../../components/commons/Pagination/Pagination';
import { getPageIndex } from '../../utils/format';

const usePagination = (itemLength: number, sliceUnit: number) => {
  const paginationLength = getPageIndex(itemLength, sliceUnit);

  const [paginationIndex, setPaginationIndex] = useState(0);

  const sliceItems = (items: Array<React.ReactNode>) => {
    return items.slice(paginationIndex * sliceUnit, (paginationIndex + 1) * sliceUnit);
  };

  const onPrevButtonClick = () => {
    if (paginationIndex - 1 < 0) {
      return;
    }

    setPaginationIndex(paginationIndex - 1);
  };

  const onNextButtonClick = () => {
    if (paginationIndex + 1 >= paginationLength) {
      return;
    }

    setPaginationIndex(paginationIndex + 1);
  };

  const onPaginationButtonClick = (index: number) => {
    setPaginationIndex(index);
  };

  const PaginationContainer = () => {
    return (
      <Pagination
        maxPageNumber={paginationLength}
        activePaginationIndex={paginationIndex}
        onPaginationButtonClick={onPaginationButtonClick}
        onNextButtonClick={onNextButtonClick}
        onPrevButtonClick={onPrevButtonClick}
      ></Pagination>
    );
  };

  return {
    sliceItems,
    PaginationContainer,
  };
};

export default usePagination;
