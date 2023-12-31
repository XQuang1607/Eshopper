import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import axiosClient from '@/libraries/axiosClient';
import { useRouter } from "next/router";
import Link from "next/link";

function ProductDetail(props) {
  const { product, productsOfCategoryShop } = props;

  return (
    <>
      <Head>
        <title>Ban chai da nang</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {product && (
        <main>
          <p>
            <strong>name:</strong> {product.name}
          </p>
          <div>
            <div className="container-fluid pt-5">
              <div className="text-center mb-4">
                <h2 className="section-title px-5">
                  <span className="px-2">Flash Sale Products</span>
                </h2>
              </div>
                {productsOfCategoryShop.map((cat) => (
                  <div style={{fontSize: '30px'}} key={cat.products._id}>
                    <Link
                      // style={{ height: "80px" }}
                      // key={cat.products._id}
                      href={`/products/${cat._id}`}
                    >
                      <div style={{fontSize: '30px'}}>
                        {cat.products.price}
                        
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </main>
      )}


    </>
  );
}


export default ProductDetail;


// export async function getStaticProps(req) {
//   try {
//     const { params } = req;
//     const response = await axiosClient.get(`/user/categories/${params.id}`);

//     return {
//       props: {
//         product: response.data.payload,
//       },
//       revalidate: 60 * 60 * 24 * 30,
//       // revalidate: 10,
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }

export async function getServerSideProps(req) {
  try {
    const { params } = req;
    const response = await axiosClient.get(`/user/categories/${params.id}`);
    // const response1 = await axiosClient.get("/user/products");
    const response2 = await axiosClient.get(
      "/questions/productsofcategoryshop/"
    );
    return {
      props: {
        product: response.data.payload,
        productsOfCategoryShop: response2.data.payload,

      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
