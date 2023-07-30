import Head from 'next/head'
import { Inter } from 'next/font/google'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Main from '@/layouts/Main';
import axiosClient from '@/libraries/axiosClient';


const inter = Inter({ subsets: ['latin'] })

export default function Home({productsOfCategoryShop,productsOfCateogory,flashSale,bestsale}) {
  return (
    <>
      <Head>
        <title>Trang thương mại uy tín</title>
        <meta name="description" content="Trang thương mại uy tín" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main productsOfCategoryShop={productsOfCategoryShop} productsOfCateogory ={productsOfCateogory} flashSale={flashSale} bestsale={bestsale}/>
    </>
  )
}
export async function getServerSideProps() {
  try {
    const response1 = await axiosClient.get('/questions/productsofcategoryshop');
    const response2 = await axiosClient.get('/questions/productsofcateogory');
    const response3 = await axiosClient.get('/questions/flashsale');
    const response4 = await axiosClient.get('/questions/hotsale');
    // const response3 = await axiosClient.get('/questions/hotsale');
    // const response4 = await axiosClient.get('/user/products');
    return {
      props: {
        productsOfCategoryShop: response1.data.payload,
        productsOfCateogory: response2.data.payload,
        flashSale: response3.data.payload,
        bestsale: response4.data.payload,
      },

      // revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}