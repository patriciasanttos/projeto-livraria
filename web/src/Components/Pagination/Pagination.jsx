import React, { useEffect, useState } from 'react';

//-----Icons
import arrowLeft from '../../assets/icons/no-bg-arrow-left.svg';
import arrowRight from '../../assets/icons/no-bg-arrow-right.svg';

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
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-component-arrow"
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
                ? 'more-pages-icon'
                : ''
            }
          `}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-component-arrow"
      >
        <img src={arrowRight} alt="Próxima página" />
        <p>Próxima página</p>
      </button>
    </div>
  );
};

export default Pagination;