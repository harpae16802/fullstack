import React from 'react'
// 樣式
import style from './style.module.scss'

export default function CategoryCard({
  imgUrl = '',
  title = '',
  imgStyle = {},
  onClick,
}) {
  return (
    <div className={style.card} onClick={() => onClick(title)}>
      <div className={style.imageContainer}>
        <img
          src={imgUrl}
          alt={title}
          className={style.image}
          style={imgStyle}
        />
      </div>
      <p className={style.title}>{title}</p>
    </div>
  )
}
