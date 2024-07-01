import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./Pagination.module.scss";

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

function Pagination(props) {
  const {
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    handlePageChange,
  } = props;
  const [visiblePages, setVisiblePages] = useState([]);

  const updateVisiblePages = (currentPage, totalPages) => {
    const pageLimit = 3;
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = startPage + pageLimit - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - pageLimit + 1, 1);
    }
    let pages = Array.from(
      Array(endPage - startPage + 1),
      (_, i) => startPage + i,
    );
    let tempVisiblePages = [];

    if (startPage > 2) {
      tempVisiblePages.push(1, "...");
    } else if (startPage === 2) {
      tempVisiblePages.push(1);
    }

    tempVisiblePages.push(...pages);

    if (endPage < totalPages - 1) {
      tempVisiblePages.push("...", totalPages);
    } else if (endPage === totalPages - 1) {
      tempVisiblePages.push(totalPages);
    }
    setVisiblePages(tempVisiblePages);
  };

  useEffect(() => {
    updateVisiblePages(currentPage, totalPages);
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="left"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
        </svg>
      </button>
      <div className={styles.pageNumbers}>
        {visiblePages.map((pageNumber, index) => (
          <button
            key={index}
            className={`${styles.paginationButton} ${
              pageNumber === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === "..."}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className={styles.paginationButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="right"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          data-spm-anchor-id="a2o4n.searchlist.0.i3.709f3610MfXBQV"
        >
          <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
