import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SellerContext } from '../contexts/SellerContext'; // 路径依你的项目结构调整

const SalesSummary = () => {
    const [salesData, setSalesData] = useState({});
    const { seller } = useContext(SellerContext);
    const sellerId = seller?.id;

    useEffect(() => {
        if (sellerId) {
            axios.get(`http://localhost:3002/order/sales-summary/${sellerId}`)
                .then(response => {
                    setSalesData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching sales data:', error);
                });
        }
    }, [sellerId]);

    if (!salesData) return <div>Loading...</div>;

    return (
        <div>
            <h1>Sales Summary</h1>
            <p>Total Quantity Sold: {salesData.total_quantity_sold}</p>
            <p>Total Revenue: ${salesData.total_revenue}</p>
        </div>
    );
};

export default SalesSummary;
