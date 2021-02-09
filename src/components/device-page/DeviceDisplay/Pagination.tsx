import BSPagination from 'react-bootstrap/Pagination';
import { FC, Fragment, ReactElement } from 'react';
import { Container } from '../../shared';
import { useAppContext } from '../../../context';
import { Pagination as IPagination, PaginationIndex } from '../../../types';

export interface PaginationProps {
  lastPage: number;
  pagination: IPagination;
}

const renderPagination: (
  pagination: PaginationIndex,
  navigatePagination: (paginationIndex: PaginationIndex) => void,
  activePagination: number,
  lastPage: number
) => ReactElement = (
  pagination,
  navigatePagination,
  activePagination,
  lastPage
) => {
  switch (pagination) {
    case 'first':
      return (
        <Fragment key={pagination}>
          <BSPagination.First onClick={() => navigatePagination('first')}>
            1
          </BSPagination.First>

          <BSPagination.Ellipsis />

          <BSPagination.Prev
            onClick={() => navigatePagination(activePagination - 1)}
          />
        </Fragment>
      );
    case 'last':
      return (
        <Fragment key={pagination}>
          <BSPagination.Next
            onClick={() => navigatePagination(activePagination + 1)}
          />

          <BSPagination.Ellipsis />

          <BSPagination.Last onClick={() => navigatePagination('last')}>
            {lastPage}
          </BSPagination.Last>
        </Fragment>
      );
    default:
      return (
        <BSPagination.Item
          key={`${pagination}-item`}
          onClick={() => navigatePagination(pagination as number)}
          active={pagination === activePagination}
        >
          {(pagination as number) + 1}
        </BSPagination.Item>
      );
  }
};

const Pagination: FC<PaginationProps> = ({ pagination, lastPage }) => {
  const { navigatePagination, activePagination } = useAppContext();

  return (
    <Container>
      <BSPagination>
        {pagination.map(pagination =>
          renderPagination(
            pagination,
            navigatePagination,
            activePagination,
            lastPage
          )
        )}
      </BSPagination>
    </Container>
  );
};

export default Pagination;
