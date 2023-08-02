import { useState, useEffect } from "react";
import React from 'react'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import Head from 'next/head'
import { getTokenFromLocalStorage } from "../../utils/tokenUtils";
import jwt_decode from "jwt-decode";
import axiosClient from "@/libraries/axiosClient";
import Link from "next/link";
import { useRouter } from "next/router";

const Cart = () => {
    const [customerId, setCustomerId] = useState(null);
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState([]);
    // const [shippingFee, setShippingFee] = useState(10);
    const [couponCode, setCouponCode] = useState(""); // Thêm state để lưu mã giảm giá
    const router = useRouter();

    // const handleShippingFeeChange = (event) => {
    //     const fee = parseFloat(event.target.value);
    //     setShippingFee(isNaN(fee) ? 0 : fee);
    // };

    const handleCouponCodeChange = (event) => {
        setCouponCode(event.target.value);
    };

    useEffect(() => {
        const token = getTokenFromLocalStorage();

        if (token) {
            try {
                // Giải mã token để lấy thông tin customerId
                const decodedToken = jwt_decode(token);
                const { _id: customerId } = decodedToken;
                setCustomerId(customerId);
                fetchCartData(customerId);
            } catch (error) {
                console.error("Error decoding token:", error);
                setCustomerId(null);
            }
        }
    }, []);

    const fetchCartData = async (customerId) => {
        const token = getTokenFromLocalStorage();
        try {
            const response = await axiosClient.get(
                `/user/cart/${customerId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setProducts(response.data.payload.products);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    //xóa sản phẩm trong giỏ hàng
    const handleRemoveProduct = async (productId) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            try {
                const response = await axiosClient.delete("/user/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        customerId,
                        productId,
                    },
                });

                // If product removed successfully, update cart data
                fetchCartData(customerId);
            } catch (error) {
                console.error("Error removing product:", error);
            }
        }
    };
    // checkbox
    const handleCheckboxChange = (productId) => {
        const isChecked = checkedProducts.includes(productId);
        if (isChecked) {
            // Nếu sản phẩm đã được chọn thì bỏ chọn (xóa khỏi mảng checkedProducts)
            setCheckedProducts(checkedProducts.filter((id) => id !== productId));
        } else {
            // Nếu sản phẩm chưa được chọn thì thêm vào mảng checkedProducts
            setCheckedProducts([...checkedProducts, productId]);
        }
    };

    // // Tính tổng tiền sau khi trừ đi phí ship
    // const calculateTotalPrice = (products, shippingFee, couponCode) => {
    //     let total = 0;
    //     products.forEach((product) => {
    //         if (checkedProducts.includes(product._id)) {
    //             total += product.productId.discountedPrice * product.quantity;
    //         }
    //     });

    //     if (couponCode === "GIAM20%") {
    //         const couponDiscount = 0.8;
    //         total *= couponDiscount;
    //     } else if (couponCode === "GIAM10%") {
    //         const couponDiscount = 0.9;
    //         total *= couponDiscount;
    //     }

    //     total += shippingFee; // Thêm phí ship vào tổng tiền
    //     return total;
    // };

    // const totalPrice = calculateTotalPrice(products, shippingFee, couponCode);

    //Tính tổng tiền sản phẩm sau khi áp dụng mã giảm giá
    const calculateTotalPrice1 = (products) => {
        let total = 0;
        products.forEach((product) => {
            if (checkedProducts.includes(product._id)) {
                // Nếu sản phẩm có trong mảng checkedProducts, tính tổng tiền
                total += product.productId.discountedPrice * product.quantity;
            }
        });

        if (couponCode === "30% off coupon") {
            const couponDiscount = 0.7;
            total *= couponDiscount;
            return total;
        } else if (couponCode === "20% off coupon") {
            const couponDiscount = 0.8;
            total *= couponDiscount;
            return total;
        }
        return total;
    };

    //Tính tổng tiền sản phẩm trước khi áp dụng mã giảm giá
    const calculateTotalPrice2 = (products) => {
        let total = 0;
        products.forEach((product) => {
            if (checkedProducts.includes(product._id)) {
                // Nếu sản phẩm có trong mảng checkedProducts, tính tổng tiền
                total += product.productId.discountedPrice * product.quantity;
            }
        });
        return total;
    };

    const updateProductPrice = (productId, newQuantity) => {
        const updatedProducts = products.map((product) =>
            product._id === productId ? { ...product, quantity: newQuantity } : product
        );
        setProducts(updatedProducts);
    };

    // Gọi hàm updateProductPrice khi số lượng sản phẩm thay đổi
    const handleIncreaseQuantity = (productId) => {
        const selectedProduct = products.find((product) => product._id === productId);
        if (selectedProduct) {
            if (selectedProduct.quantity + 1 <= selectedProduct.productId.stock) {
                updateProductPrice(productId, selectedProduct.quantity + 1);
            }
        }
    };

    const handleDecreaseQuantity = (productId) => {
        const selectedProduct = products.find((product) => product._id === productId);
        if (selectedProduct) {
            if (selectedProduct.quantity > 1) {
                updateProductPrice(productId, Math.max(selectedProduct.quantity - 1, 1));
            }
        }
    };


    const handleBuyNow = () => {
        const selectedProductsQueryParam = JSON.stringify(
            checkedProducts.map((productId) => {
                const selectedProduct = products.find((product) => product._id === productId);
                if (selectedProduct) {
                    const { quantity, productId: { _id, discountedPrice, discount, name, cover } } = selectedProduct;

                    return { _id, quantity, price: discountedPrice,discount, name, cover }; // Thêm thông tin ảnh và tên sản phẩm
                }
                return null;
            }).filter((product) => product !== null)
        );

        const totalPriceQueryParam = totalPrice1.toString();

        let discount = 0;
        if (couponCode === "30% off coupon") {
            discount = 30;
        } else if (couponCode === "20% off coupon") {
            discount = 20;
        }

        if (checkedProducts.length > 0) {
            router.push(`/checkout?products=${encodeURIComponent(selectedProductsQueryParam)}
        &totalPrice=${encodeURIComponent(totalPriceQueryParam)}
        &discount=${encodeURIComponent(discount)}
        `);
        } else {
            alert("Vui lòng chọn sản phẩm trước khi thanh toán")
        }

    };

    const totalPrice1 = calculateTotalPrice1(products);
    const shippingFee = 10; // Phí ship cố định là 10 đô
const totalPrice = totalPrice1 + shippingFee;

    const totalPrice2 = calculateTotalPrice2(products);

    return (
        <div>
            <Head>
                <title>Cart</title>
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
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <a href={"/"}>Home</a>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Shopping Cart</p>
                    </div>
                </div>
            </div>
            {/* Cart */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>

                            <tbody className="align-middle">
                                {products.map((p) => (
                                    <tr key={p._id}>
                                        <td className="align-middle" >
                                            <input type="checkbox" style={{ marginLeft: "-50px" }}
                                                checked={checkedProducts.includes(p._id)}
                                                onChange={() => handleCheckboxChange(p._id)}
                                            />
                                            <Link href={`/products/${p.productId._id}`} >
                                                <img src={p.productId.cover} alt="" style={{ width: 50, marginLeft: "25px", marginRight: "20px" }} />{" "}
                                                {p.productId.name}
                                            </Link>

                                        </td>
                                        <td className="align-middle">${p.productId.price}</td>
                                        <td className="align-middle">{p.productId.discount}%</td>
                                        <td className="align-middle">
                                            <div
                                                className="input-group quantity mx-auto"
                                                style={{ width: 100 }}
                                            >
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-minus"
                                                        onClick={() => handleDecreaseQuantity(p._id)}>
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm bg-secondary text-center"
                                                    // defaultValue={1}
                                                    value={p.quantity}
                                                />
                                                <div className="input-group-btn" >
                                                    <button className="btn btn-sm btn-primary btn-plus"
                                                        onClick={() => handleIncreaseQuantity(p._id)}>
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>

                                            </div>
                                        </td>
                                        <td className="align-middle">${p.productId.discountedPrice * p.quantity}</td>
                                        <td className="align-middle">
                                            <button className="btn btn-sm btn-primary"
                                                onClick={() => handleRemoveProduct(p.productId._id)}>
                                                <i className="fa fa-times" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-5" action="">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control p-4"
                                    // id={styles.code}
                                    placeholder="Coupon Code"
                                    value={couponCode}
                                    onChange={handleCouponCodeChange}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    {/* <h6 className="font-weight-medium">Subtotal</h6> */}
                                    <h6 className="font-weight-medium">{checkedProducts ? (<p>{checkedProducts.length} sản phẩm</p>) : (<p>0 sản phẩm</p>)}</h6>
                                    <h6 className="font-weight-medium">${totalPrice2}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">${shippingFee}</h6>
                                   
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>
                                    <h5 className="font-weight-bold">${totalPrice}</h5>
                                    {/* <h5 className="font-weight-bold">${totalPrice}</h5> */}
                                </div>
                                <button className="btn btn-block btn-primary my-3 py-3" onClick={handleBuyNow}>
                                    Proceed To Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Footer />

        </div>
    )
}

export default Cart