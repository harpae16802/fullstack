import React, { useState } from 'react'
import styles from '@/styles/navbar-seller.module.scss'
function PaginationComponent({ totalItems, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const renderPageNumbers = () => {
    if (totalItems <= itemsPerPage) return null

    const pageNumbers = []
    let startPage = Math.max(currentPage - 2, 1)
    let endPage = Math.min(startPage + 4, totalPages)

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? 'active' : ''}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      )
    }

    return pageNumbers
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          >
            <i className="bi bi-chevron-left"></i> 
          </button>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
          >
             <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default PaginationComponent
