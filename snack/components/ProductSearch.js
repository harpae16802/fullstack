// components/ProductSearch.js
import React, { useState } from 'react';

const ProductSearch = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(productName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="productName">Product Name:</label>
      <input
        type="text"
        id="productName"
        name="productName"
        value={productName}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default ProductSearch;
