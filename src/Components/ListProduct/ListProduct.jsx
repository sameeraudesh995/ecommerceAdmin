import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { useToast } from '../ToastContext/ToastContext'

const ITEMS_PER_PAGE = 5

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

   const { showToast } = useToast() 
   
  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) })
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  const remove_product = async (id) => {
  await fetch('http://localhost:4000/removeproduct', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.success) {
        showToast('success', 'Product removed!', 'Product was deleted successfully.')
      } else {
        showToast('error', 'Failed!', 'Could not remove the product. Please try again.')
      }
    })

  await fetchInfo()
}

  const totalPages = Math.ceil(allproducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentProducts = allproducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {currentProducts.map((product, index) => (
          <React.Fragment key={startIndex + index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>Lkr {product.old_price}</p>
              <p>Lkr {product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >&#171;</button>

          <button
            className="pagination-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >&#8249;</button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => goToPage(page)}
            >{page}</button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >&#8250;</button>

          <button
            className="pagination-btn"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >&#187;</button>

          <span className="pagination-info">
            Page {currentPage} of {totalPages} &nbsp;|&nbsp; {allproducts.length} products
          </span>
        </div>
      )}
    </div>
  )
}

export default ListProduct