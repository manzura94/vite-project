import React from 'react';

interface PagiPros {
  loading: boolean;
  handlePageChange: (page: number) => void;
  currentPage: number;
}

export const Pagination = ({
  currentPage,
  loading,
  handlePageChange,
}: PagiPros) => {
  return (
    <>
      {!loading && (
        <div className="button_wrapper">
          <button
            className="button button_prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage == 1}
          >
            prev
          </button>
          <h4>{`{${currentPage}}`}</h4>
          <button
            className="button button_next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 10}
          >
            next
          </button>
        </div>
      )}
    </>
  );
};
