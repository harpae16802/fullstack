import React, { useEffect, useState } from 'react'
// 套件
import Modal from 'react-modal'
// 元件
import ProductDetailCardCopy from '@/components/Product/productDetail-copy'
// icons
import { FaThumbsUp, FaPlus, FaRegHeart, FaHeart } from 'react-icons/fa'
// fetch 網址
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
  SHOP_PRODUCTS,
  API_SERVER,
} from '@/components/config/api-path'
// context
import { useCartContext } from '@/contexts/cartContext'
import { useAuth } from '@/contexts/custom-context'
// 樣式
import style from './style.module.scss'

Modal.setAppElement('#__next')

export default function ProductCard({
  product_id,
  imgUrl = '',
  title = '',
  price = '',
  percentage = '',
  pepole = '',
}) {
  const { auth, getAuthHeader } = useAuth()
  const { addToCart } = useCartContext()
  const [isFavorite, setIsFavorite] = useState(false) // 最愛
  const [modalIsOpen, setIsModalOpen] = useState(false) // 彈窗
  const [selectedProduct, setSelectedProduct] = useState(null)

  // modal open
  const openModal = () => {
    fetchProductDetail(product_id)
    setIsModalOpen(true)
  }
  // close
  const closeModal = (e) => {
    // e.stopPropagation()
    setIsModalOpen(false)
  }

  // 加入收藏 - 商品
  const toggleFavoriteProducts = async () => {
    try {
      if (!auth.token) {
        const willLogIn = confirm('請先登入會員')
        if (willLogIn) {
          window.location.href = '/login/login-custom'
        }
        return
      }

      const r = await fetch(`${FAVORITE_PRODUCTS}/${product_id}`, {
        headers: { ...getAuthHeader() },
      })
      const data = await r.json()
      if (data.success) {
        setIsFavorite(data.action === 'add')
      }
    } catch (error) {
      console.error('加入最愛 錯誤:', error)
    }
  }
  // 检查收藏状态
  const checkFavoriteStatus = async () => {
    try {
      if (!auth.token) {
        // 如果未登录，暂不做任何操作
        console.log('用户未登录，暂不检查收藏状态')
        return
      }

      const r = await fetch(`${C_FAVORITE_PRODUCTS}/${product_id}`, {
        headers: { ...getAuthHeader() },
      })
      if (!r.ok) throw new Error('网络回应错误')
      const data = await r.json()
      if (data.isFavorite !== undefined) {
        setIsFavorite(data.isFavorite)
      }
    } catch (error) {
      console.error('检查收藏状态时出错:', error)
    }
  }

  // 加入購物車
  const handleAddToCart = () => {
    addToCart(product_id)
  }

  const fetchProductDetail = (product_id) => {
    fetch(`${SHOP_PRODUCTS}/theProduct/${product_id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedProduct(data[0])
      })
  }

  useEffect(() => {
    if (auth.token) {
      checkFavoriteStatus()
    }
  }, [product_id])

  return (
    <div className={style.card}>
      <div className={style.imgDiv} onClick={openModal}>
        <img src={imgUrl} className={style.img} />
        <p>點圖看更多</p>
      </div>
      <button className={style.addBtn} onClick={handleAddToCart}>
        <FaPlus />
      </button>
      <div className={style.textDiv}>
        <div className={`d-flex align-items-center`}>
          <h5 className={`fw-bold mb-0 ${style.title}`}>{title}</h5>
          {isFavorite ? (
            <FaHeart
              className={`${style.icon}`}
              onClick={toggleFavoriteProducts}
            />
          ) : (
            <FaRegHeart
              className={`${style.icon}`}
              onClick={toggleFavoriteProducts}
            />
          )}
        </div>

        <div className="d-flex align-items-center">
          <span className={style.price}>${price}</span>
          <span className="d-flex align-items-center">
            <FaThumbsUp className={style.iconThumbsUp} />
            {percentage}({pepole})
          </span>
        </div>
      </div>
      {/* detail modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="產品詳細"
        className={style.modal}
        overlayClassName={style.overlay}
      >
        {selectedProduct && (
          <ProductDetailCardCopy
            imageUrl={`${API_SERVER}/public/${selectedProduct.image_url}`}
            seller={selectedProduct.store_name}
            product={selectedProduct.product_name}
            description={selectedProduct.product_description}
            price={selectedProduct.price}
            ingredient={selectedProduct.product_ingredient}
            nutrition={selectedProduct.product_nutrition}
            onClose={closeModal}
            favorite={toggleFavoriteProducts}
            isFavorite={isFavorite}
            product_id={product_id}
          />
        )}
      </Modal>
    </div>
  )
}
