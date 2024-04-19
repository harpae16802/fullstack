import Section from '@/components/layout/section'
import React from 'react'
import FilterOptions from '@/components/Product/productFilter'


export default function ProductFilter() {
    return(
        <>
            <Section >
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                <FilterOptions />
                
                </div>
              </div>
            </div>
          
            

            </Section>
            </>
            )
}