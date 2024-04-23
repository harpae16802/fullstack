// components/DateRangePicker.js
import React, { useState } from 'react';

const DateRangePicker = ({ onChange }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateRangePicker;
