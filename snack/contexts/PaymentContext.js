// src/contexts/PaymentContext.js
import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);  // 確保這裡是導出 `usePayment`

export const PaymentProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState({
    items: [],
    selectedDiscount: null,
    finalAmount: 0,
    pointsReduction: 0,
    totalAmount: 0,
    remainingPoints: 0,
  });

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};
