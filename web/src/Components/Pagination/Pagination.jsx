import React, { useEffect, useState } from 'react';

//-----Icons
import arrowLeft from '../../assets/icons/no-bg-arrow-left.svg';
import arrowRight from '../../assets/icons/no-bg-arrow-right.svg';

import './Pagination.scss';

const Pagination = ({ totalItems, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / 9);

  useEffect(() => {
    setCurrentPage(1);
    onPageChange(1);
  }, [totalItems, onPageChange]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }

    return window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    if (totalPages <= 10)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pageNumbers = [];

    pageNumbers.push(1);

    if (currentPage > 4)
      pageNumbers.push('...');

    const startRange = Math.max(2, currentPage - 1);
    const endRange = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startRange; i <= endRange; i++) {
      if (!pageNumbers.includes(i))
        pageNumbers.push(i);
    }

    if ((currentPage < totalPages - 3) && !pageNumbers.includes('...'))
      pageNumbers.push('...');

    if (!pageNumbers.includes(totalPages))
      pageNumbers.push(totalPages);

    return pageNumbers;
  };

  if (totalPages <= 1)
    return null;

  return (
    <div className="pagination-component">
      <button
        onClick={() => currentPage !== 1 && handlePageChange(currentPage - 1)}
        className={`pagination-component-arrow 
          ${currentPage === 1
            ? 'pagination-component-arrow-disabled'
            : ''
          }
        `}
      >
        <img src={arrowLeft} alt="Página anterior" />
        <p>Página anterior</p>
      </button>

      {getPageNumbers().map((number, index) => (
        <button
          key={index}
          onClick={() => typeof number === 'number' && handlePageChange(number)}
          className={`pagination-component-button 
            ${number === currentPage
              ? 'current-page'
              : number === '...'
                ? 'more-pages-button'
                : ''
            }
          `}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => currentPage !== totalPages && handlePageChange(currentPage + 1)}
        className={`pagination-component-arrow 
          ${currentPage === totalPages
            ? 'pagination-component-arrow-disabled'
            : ''
          }
        `}
      >
        <p>Próxima página</p>
        <img src={arrowRight} alt="Próxima página" />
      </button>
    </div>
  );
};

export default Pagination;