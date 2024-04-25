import Section from '@/components/layout/section'
import React from 'react'
import ProductDetailCard from '@/components/Product/productDetail'



export default function ProductDetail() {
    return(
        <>
            <Section>
            
            <ProductDetailCard 
                imageUrl = "/images/蛋塔.jpg"
                seller = "姊姊抓的餅"
                product = "豬排蛋"
                description = "香噴噴的炸豬排，外酥內嫩，蛋汁滑嫩地流淌出來，與香氣四溢的抓餅完美融合。一口咬下，豬排的鮮美與蛋的滑嫩在口中交融，配上外皮香脆的抓餅，彷彿是一場口感盛宴，勾勒出濃郁的台灣街頭味道。"
                price = "70"
                ingredient = "麵粉、麵粉、雞蛋、鹽"
                nutrition="營養成分表"
            />

            </Section>
        </>
        )
}