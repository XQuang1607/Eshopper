import Image from 'next/image'
import React from 'react'
import { useState,useEffect } from "react";
import { useRouter } from "next/router";

const Header = ( {cartItems } ) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    // Redirect to the shop page with the search keyword as a query parameter
    router.push(`/productSearch?keyword=${encodeURIComponent(searchKeyword)}`);
  };


  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark" href="">
                FAQs
              </a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href="">
                Help
              </a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href="">
                Support
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark px-2" href="">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-twitter" />
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-instagram" />
              </a>
              <a className="text-dark pl-2" href="">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a href={'/'} className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  E
                </span>
                shopper
              </h1>
            </a>
          </div>
          <div className="col-lg-6 col-6 text-left">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <div className="input-group-append">
                  {/*                   
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search" />
                  </span> */}
                  <button
                    type="submit"
                    className="input-group-text bg-transparent text-primary"
                  >
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-6 text-right">
            <a href="" className="btn border">
              <i className="fas fa-heart text-primary" />
              <span className="badge">0</span>
            </a>
            <a href={'/cart'} className="btn border">
              <i className="fas fa-shopping-cart text-primary" />
              <span className="badge">{cartItems}</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header