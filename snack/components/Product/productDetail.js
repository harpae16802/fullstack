import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiHeart, FiMinus, FiPlus } from 'react-icons/fi'; // Make sure to import FiMinus and FiPlus if used
import styles from '@/styles/Product.module.css'; // Ensure the correct style file is referenced
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path';

export default function ProductDetailCard({
  product_id,
  imageUrl = "",
  seller = "",
  product = "",
  description = "",
  price = "",
  ingredient = "",
  nutrition = "",
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity

  const toggleFavoriteProducts = async () => {
    try {
      const response = await fetch(`${FAVORITE_PRODUCTS}/${product_id}`);
      const data = await response.json();
      if (data.success) {
        setIsFavorite(data.action === 'add');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const response = await fetch(`${C_FAVORITE_PRODUCTS}/${product_id}`);
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    };

    checkFavoriteStatus();
  }, [product_id]);

  return (
    <>
      <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
        <div className={`modal-dialog ${styles.detailModalSize}`}>
          <div className="modal-content">
            <div className="modal-body">
              <div className={styles.detailContainer}>
                <Image src={imageUrl} width={759} height={726} alt="Product" />
                <div className={styles.detailTextArray}>
                  <button type="button" className={`btn-close ${styles.detailCrossIcon}`} data-bs-dismiss="modal" aria-label="Close"></button>
                  <div className={styles.detailSeller}>{seller}</div>
                  <div className={styles.detailProductName}>{product}</div>
                  <div className={styles.detailIntroduce}>{description}</div>
                  <div className={styles.detailPrice}>${price}</div>
                  <div className={styles.quantity}>
                    <button onClick={decreaseQuantity}><FiMinus /></button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={increaseQuantity}><FiPlus /></button>
                  </div>
                  <div style={{ display: 'flex', marginTop: '20px', marginLeft: '115px', color: '#A32C2D', fontSize: '30px' }}>
                    <FiHeart className={styles.detailHeartIcon} onClick={toggleFavoriteProducts} />
                    <button className={styles.addCartButton}>加入購物車</button>
                    <button className={styles.immediateBuyButton}>立即購買</button>
                  </div>
                  <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          成分 :
                        </button>
                      </h2>
                      <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne">
                        <div className={`accordion-body ${styles.detailIngredient}`}>{ingredient}</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                          營養成分:
                        </button>
                      </h2>
                      <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo">
                        <div className={`accordion-body ${styles.nutritionIngredient}`}>{nutrition}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
