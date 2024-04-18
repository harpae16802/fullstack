import React from 'react'
import dynamic from 'next/dynamic'
// 元件
import SectionNopaddin from '../../components/layout/section-nopaddin'
import SearchBar from '@/components/common/search-bar'
// 樣式
import 'leaflet/dist/leaflet.css'
import style from './market-map.module.scss'

const MapComponent = dynamic(() => import('../../components/market-map/map'), {
  ssr: false,
})

export default function MarketMap() {
  return (
    <SectionNopaddin>
      <div className={style.searchBar}>
        <SearchBar />
      </div>
      <MapComponent />
    </SectionNopaddin>
  )
}
