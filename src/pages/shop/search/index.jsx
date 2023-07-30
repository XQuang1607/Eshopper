import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axiosClient from "@/libraries/axiosClient";
import Image from "next/image";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

function ShopSearch({ products, productsOfCategoryShop }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Số sản phẩm hiển thị trên mỗi trang

  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  // Tính toán chỉ mục sản phẩm bắt đầu và kết thúc trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // // Lọc sản phẩm theo từ khóa tìm kiếm và category được chọn
  // const filteredProducts = products.filter((p) => {
  //   const nameMatch = p.name.toLowerCase().includes(searchKeyword.toLowerCase());
  //   const categoryMatch =
  //     selectedCategory === "" || p.category === selectedCategory;
  //   return nameMatch && categoryMatch;
  // });

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Chuyển đến trang tiếp theo
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Quay lại trang trước
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Xử lý sự kiện tìm kiếm
  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1); // Quay về trang đầu tiên khi tìm kiếm
  };

  // // Xử lý sự kiện chọn category
  // const handleCategoryChange = (event) => {
  //   const category = event.target.value;
  //   setSelectedCategory(category);
  //   setCurrentPage(1); // Quay về trang đầu tiên khi chọn category
  // };

  // Lọc sản phẩm theo category khi click vào category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Quay về trang đầu tiên khi click vào category
  };
 

  return (
    <>
      <Head>
        <title>Hello</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 300 }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Our Shop
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop</p>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          <div className="col-lg-3 col-md-12">
            {/* Category start */}
            <div className="border-bottom mb-4 pb-4">
              <h5 className="font-weight-semi-bold mb-4">Filter by Category</h5>
              <form>
                {/* <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    defaultChecked=""
                    id="category-all"
                  />
                  <label className="custom-control-label" htmlFor="category-all">
                    All Price
                  </label>
                  <span className="badge border font-weight-normal">1000</span>
                </div> */}
                {productsOfCategoryShop.map((cate) => (
                  <Link key={cate._id} href={`/`}>
                    <div
                      className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                      style={{ fontSize: "17px" }}
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="category"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="category"
                      >
                        {cate.name}
                      </label>
                      <span className="badge font-weight-normal">
                        {cate.totalProduct}
                      </span>
                    </div>
                  </Link>
                ))}
                {/* {productsOfCategoryShop.map((cate) => (
            <div
              className={`custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3 ${
                cate.name === selectedCategory ? "active" : ""
              }`}
              key={cate._id}
              onClick={() => handleCategoryFilter(cate.name)}
              style={{ fontSize: "17px", cursor: "pointer" }}
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id={cate.name}
                checked={cate.name === selectedCategory}
                readOnly
              />
              <label className="custom-control-label" htmlFor={cate.name}>
                {cate.name}
              </label>
              <span className="badge font-weight-normal">{cate.totalProduct}</span>
            </div>
                ))} */}
              </form>
            </div>
            {/* Price Start */}
            {/* <div className="border-bottom mb-4 pb-4">
              <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    defaultChecked=""
                    id="price-all"
                  />
                  <label className="custom-control-label" htmlFor="price-all">
                    All Price
                  </label>
                  <span className="badge border font-weight-normal">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-1"
                  />
                  <label className="custom-control-label" htmlFor="price-1">
                    $0 - $100
                  </label>
                  <span className="badge border font-weight-normal">150</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-2"
                  />
                  <label className="custom-control-label" htmlFor="price-2">
                    $100 - $200
                  </label>
                  <span className="badge border font-weight-normal">295</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-3"
                  />
                  <label className="custom-control-label" htmlFor="price-3">
                    $200 - $300
                  </label>
                  <span className="badge border font-weight-normal">246</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-4"
                  />
                  <label className="custom-control-label" htmlFor="price-4">
                    $300 - $400
                  </label>
                  <span className="badge border font-weight-normal">145</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-5"
                  />
                  <label className="custom-control-label" htmlFor="price-5">
                    $400 - $500
                  </label>
                  <span className="badge border font-weight-normal">168</span>
                </div>
              </form>
            </div> */}
            {/* Price End */}
          </div>
          {/* Shop Sidebar End */}
          {/* Shop Product Start */}
          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form action="">
                    {/* Ô nhập từ khóa tìm kiếm */}
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchKeyword}
                        onChange={handleSearch}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                          <i className="fa fa-search" />
                        </span>
                      </div>
                    </div>
                  </form>
                  
                  {/* sort theo tên */}
                  {/* <div className="dropdown ml-4">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="triggerId"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="triggerId"
                    >
                      <a className="dropdown-item" href="#">
                        Latest
                      </a>
                      <a className="dropdown-item" href="#">
                        Popularity
                      </a>
                      <a className="dropdown-item" href="#">
                        Best Rating
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
              {currentProducts.map((p) => (
                <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                  <Link
                    // style={{ height: "80px" }}
                    key={p._id}
                    href={`/products/${p._id}`}
                  >
                    <div className="card product-item border-0 mb-4">
                      <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img className="img-fluid w-100" src={p.cover} alt="" />
                        <span className="discount-label">{p.discount} %</span>
                      </div>
                      <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 className="text-truncate mb-3">{p.name}</h6>
                        <div className="d-flex justify-content-center">
                          <h6>${p.discountedPrice}</h6>
                          <h6 className="text-muted ml-2">
                            <del style={{ color: "#EF7A59" }}>${p.price}</del>
                          </h6>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between bg-light border">
                        <div href="" className="btn btn-sm text-dark p-0">
                          <i className="fas fa-eye text-primary mr-1" />
                          View Detail
                        </div>
                        <div href="" className="btn btn-sm text-dark p-0">
                          <i className="fas fa-shopping-cart text-primary mr-1" />
                          Add To Cart
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              <div className="col-12 pb-1">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center mb-3">
                    {/* Nút trang trước */}
                    <li
                      className={`page-item ${currentPage === 1 ? "disabled" : ""
                        }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={prevPage}
                      >
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    {/* Hiển thị các nút trang */}
                    {Array.from({
                      length: Math.ceil(products.length / productsPerPage),
                    }).map((_, index) => (
                      <li
                        className={`page-item ${index + 1 === currentPage ? "active" : ""
                          }`}
                        key={index}
                      >
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    {/* Nút trang tiếp theo */}
                    <li
                      className={`page-item ${currentPage ===
                        Math.ceil(products.length / productsPerPage)
                        ? "disabled"
                        : ""
                        }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={nextPage}
                      >
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ShopSearch;

// getServerSideProps - Server-Side Rendering
export async function getServerSideProps() {
  try {
    const response = await axiosClient.get("/user/products");
    const response1 = await axiosClient.get(
      "/questions/productsofcategoryshop"
    );

    return {
      props: {
        products: response.data.payload,
        productsOfCategoryShop: response1.data.payload,
      },

      // revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

// getStaticProps - Static-Side Generation
// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }

// export async function getStaticProps(req) {
//   try {
//     const response = await axiosClient.get('/user/products');

//     return {
//       props: {
//         products: response.data.payload,
//       },

//       // revalidate: 10,
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }
