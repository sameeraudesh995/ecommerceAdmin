import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useToast } from '../ToastContext/ToastContext'

const AddProduct = () => {

  const { showToast } = useToast()

  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    discription: "",        // ✅ added
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const Add_Product = async () => {
    console.log(productDetails)

    // ✅ basic validation
    if (!productDetails.name || !productDetails.new_price || !productDetails.old_price) {
      showToast('warning', 'Missing Fields', 'Please fill in all required fields.')
      return
    }
    if (!image) {
      showToast('warning', 'No Image', 'Please upload a product image.')
      return
    }

    let responsData
    let product = productDetails

    let formData = new FormData()
    formData.append('product', image)

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => { responsData = data })
      .catch(() => {
        showToast('error', 'Upload Error', 'Could not connect to server.')
        return
      })

    if (responsData.success) {
      product.image = responsData.image_url
      console.log(product)

      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            showToast('success', 'Product Added!', 'Your product was saved successfully.')
            // ✅ reset form after success
            setProductDetails({
              name: "",
              discription: "",
              image: "",
              category: "women",
              new_price: "",
              old_price: ""
            })
            setImage(false)
          } else {
            showToast('error', 'Failed!', 'Could not add the product. Please try again.')
          }
        })
        .catch(() => {
          showToast('error', 'Server Error', 'Could not connect to server.')
        })
    } else {
      showToast('warning', 'Upload Failed!', 'Image could not be uploaded. Please try again.')
    }
  }

  return (
    <div className="add-product">

      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      {/* ✅ Description field */}
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <textarea
          value={productDetails.discription}
          onChange={changeHandler}
          name="discription"
          placeholder="Enter product description here"
          rows={4}
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt="Upload"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
          accept="image/*"
        />
      </div>

      <button onClick={Add_Product} className="addproduct-btn">ADD</button>

    </div>
  )
}

export default AddProduct