// components/CategorySelector.js
import React from 'react';

const CategorySelector = ({ categories, onChange }) => {
  return (
    <div>
      <label htmlFor="categoryId">Select Category:</label>
      <select id="categoryId" name="categoryId" onChange={onChange}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
