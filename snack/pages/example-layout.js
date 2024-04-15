import Section from '@/components/layout/section'
import React from 'react'
import Image from 'next/image'
import SearchBar from '@/components/common/search-bar'
// 用在分頁的icon
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

export default function ExampleLayout() {
  return (
    <>
      <Section>
        {/* <Image src="/images/layout/icons.png" alt="" width={500} height={500} /> */}
        <SearchBar />
        <h1>在這裡放你切好的版,記得就是用兩個Section包住</h1>
      </Section>
    </>
  )
}
