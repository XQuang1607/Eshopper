import React, { useState,useEffect } from 'react';
import Header from './Header'
import Featured from '@/components/Featured'
import Navbar from '@/components/Navbar'
import Footer from './Footer'
import ButtonScroll from '@/components/ButtonScroll'
import Categories from '@/components/Categories'
import Offer from '@/components/Offer'
import FlashSale from '@/components/FalshSaleProducts'
import BestSale from '@/components/BestSellerProducts';
import LoginForm from '@/pages/register';

const Main = ({productsOfCategoryShop, productsOfCateogory, flashSale,bestsale}) => {

  const [cartItems, setCartItems] = useState(0); // Ban đầu số lượng hàng trong giỏ hàng là 0

  useEffect(() => {
    const cartItemsFromLocalStorage = localStorage.getItem('cartItems');
    if (cartItemsFromLocalStorage) {
      setCartItems(parseInt(cartItemsFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', cartItems);
  }, [cartItems]);

  const handleAddToCart = () => {
    // Cập nhật số lượng hàng trong giỏ hàng khi click vào nút "Add To Cart"
    setCartItems((prevCartItems) => prevCartItems + 1);
  };
  return (
    <div>
        <Header cartItems={cartItems} />
        <Navbar productsOfCategoryShop={productsOfCategoryShop}/>
        <Featured />
        <Categories productsOfCateogory={productsOfCateogory}/>
        <Offer />
        <FlashSale flashSale={flashSale} handleAddToCart={handleAddToCart}/>
        <BestSale bestsale={bestsale} handleAddToCart={handleAddToCart}/>
      {/* Rest of your app */}
        <Footer />
    <ButtonScroll />
    </div>
  )
}

export default Main