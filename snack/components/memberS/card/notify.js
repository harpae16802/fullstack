import { createContext, useContext, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content' 

 
export function Notify({ children }) {
  // 要寫在元件裡
  const MySwal = withReactContent(Swal) 
  const notifyCartRemove = (productName, callback) => {
    MySwal.fire({
      title: '你確定要刪除',
      text: '你無法復原這個操作',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定刪除',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: `${productName} 商品已從購物車中刪除`,
          icon: 'success',
        })
        // 這裡才作刪除的動作
        callback()
      }
    })
  }

  const notify = (msg) => {
    MySwal.fire({
      //position: "top-end",
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <NotifyContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{ notify, notifyCartRemove }}
    >
      {children}
    </NotifyContext.Provider>
  )
}

// 3. 提供一個包裝好useContext名稱，給消費者(Consumer)方便地直接呼叫使用
export const useNotify = () => useContext(NotifyContext)