import Header from '@/layouts/Header'
import React from 'react'
import Navbar from './Navbar'
import Featured from './Featured'
import Categories from './Categories'
import Offer from './Offer'
import FlashSale from './FalshSaleProducts'
import Footer from '@/layouts/Footer'
import ButtonScroll from './ButtonScroll'


const MainHome = ({productsOfCategoryShop, productsOfCateogory, flashSale}) => {
  return (
    <div>
        {/* <Header /> */}
        <Navbar productsOfCategoryShop={productsOfCategoryShop}/>
        <Featured />
        <Categories productsOfCateogory={productsOfCateogory}/>
        <Offer />
        <FlashSale flashSale={flashSale}/>
        {/* <Footer /> */}
    <ButtonScroll />
    </div>
  )
}

export default MainHome