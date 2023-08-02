import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import Head from 'next/head'
import React, { memo, useEffect, useState } from 'react'
import InputReadOnly from '@/components/InputReadOnly'
import { apiGetPublicDistrict, apiGetPublicProvinces, apiGetPublicWard } from '@/services/app'
import SellectAddress from '@/components/SellectAddress'
import axiosClient from "@/libraries/axiosClient";
import { useRouter } from "next/router";
import { getTokenFromLocalStorage } from "@/utils/tokenUtils";
import jwt_decode from "jwt-decode";

const CheckOut = () => {
    const [specificAddress, setSpecificAddress] = useState('');
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [reset, setReset] = useState(false)

    // Customer
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addressShip, setAddressShip] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [customerId, setCustomerId] = useState(null);

    // Begin customer
    const router = useRouter();
    const { products, totalPrice, discount } = router.query;

    const selectedProducts = products ? JSON.parse(products) : [];

    const totalPriceValue = totalPrice ? parseFloat(totalPrice) : 0;

    useEffect(() => {
        const token = getTokenFromLocalStorage();

        if (token) {
            try {
                // Giải mã token để lấy thông tin customerId
                const decodedToken = jwt_decode(token);
                const { _id: customerId, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, address: address } = decodedToken;
                setCustomerId(customerId);
                setFirstName(firstName);
                setLastName(lastName);
                setEmail(email);
                setPhoneNumber(phoneNumber)
                setFullName(firstName + " " + lastName)
                setAddress(address)
            } catch (error) {
                console.error("Error decoding token:", error);
                setCustomerId(null);
            }
        }
    }, []);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    // Begin Address
    const handleSpecificAddressChange = (event) => {
        setSpecificAddress(event.target.value);
    };

    const updateAddressValue = () => {
        const newAddress = `${specificAddress} ${ward
            ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
            : ""
            } ${district
                ? `${districts?.find((item) => item.district_id === district)?.district_name},`
                : ""
            } ${province
                ? provinces?.find((item) => item.province_id === province)?.province_name
                : ""
            }`;
        setAddressShip(newAddress);
    };

    useEffect(() => {
        updateAddressValue();
    }, [specificAddress, ward, district, province]);

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])
    useEffect(() => {
        setDistrict(null)
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200) {
                setDistricts(response.data?.results)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])
    useEffect(() => {
        setWard(null)
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(district)
            if (response.status === 200) {
                setWards(response.data?.results)
            }
        }
        district && fetchPublicWard()
        !district ? setReset(true) : setReset(false)
        !district && setWards([])
    }, [district])
    // End Adress
    // Xử lý khi nhấn nút "Thanh toán"
    const handlePayment = async () => {
        const token = getTokenFromLocalStorage();
        if (token) {
            try {
                const orderDetails = selectedProducts.map((product) => ({
                    productId: product._id,
                    quantity: product.quantity,
                    price: product.price,
                    discount: product.discount,

                }));

                const useShippingAddress = document.getElementById("shipto").checked;
                const shippingAddress = useShippingAddress ? addressShip : address;

                const orderData = {
                    createdDate: new Date().toISOString(), // Ngày tạo đơn hàng là ngày hiện tại
                    paymentType: "CASH",
                    status: "WAITING",
                    // shippingAddress: address,
                    // shippingAddress: addressShip,
                    shippingAddress: shippingAddress,
                    description: comment,
                    // discount: discount,
                    customerId: customerId,
                    orderDetails: orderDetails,
                    // isDelete: false
                }
                console.log('««««« orderData »»»»»', orderData);

                // Đưa headers vào trong object headers
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const response = await axiosClient.post("/user/orders", 
                orderData, 
                { headers }
                );
                alert("Thanh cong")
                console.log("Đơn hàng đã được tạo:", response.data);

                router.push("/checkoutProcess")

            } catch (error) {
                alert("Lỗi!!!Tạo đơn hàng thất bại", error);
            }
        }
    }
    return (
        <div>
            <Head>
                <title>Checkout</title>
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
                            <a  href={"/"}>Home</a>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Shopping Cart</p>
                    </div>
                </div>
            </div>
            {/* address */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <div className="mb-4">
                            <h4 className="font-weight-semi-bold mb-4">Customer Address</h4>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>First Name</label>
                                    <input className="form-control" type="text" placeholder="John" value={firstName} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Last Name</label>
                                    <input className="form-control" type="text" placeholder="Doe"
                                        value={lastName} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Full Name</label>
                                    <input className="form-control" type="text" placeholder="Doe"
                                        value={fullName} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Address</label>
                                    <input className="form-control" type="text" placeholder="Doe"
                                        value={address} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="example@email.com"
                                        value={email}
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="+123 456 789"
                                        value={phoneNumber}
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label>Note</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Notes"
                                        value={comment}
                                        onChange={handleCommentChange}
                                    />
                                </div>

                                <div className="col-md-12 form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="shipto"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="shipto"
                                            data-toggle="collapse"
                                            data-target="#shipping-address"
                                        >
                                            Ship to different address
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="collapse mb-4" id="shipping-address">
                            <h4 className="font-weight-semi-bold mb-4">Shipping Address</h4>
                            <div className="row">

                                {/* <div className="col-md-6 form-group">
                                    <label>First Name</label>
                                    <input className="form-control" type="text" placeholder="John" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Last Name</label>
                                    <input className="form-control" type="text" placeholder="Doe" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="+123 456 789"
                                    />
                                </div> */}
                                <div className="col-md-4 form-group">
                                    <SellectAddress type='province' value={province} setValue={setProvince} options={provinces} label='Province/City(Tỉnh)' />
                                </div>
                                <div className="col-md-4 form-group">
                                    <SellectAddress reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='District(Quận)' />
                                </div>
                                <div className="col-md-4 form-group">
                                    <SellectAddress reset={reset} type='ward' value={ward} setValue={setWard} options={wards} label='Wards(phường)' />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label style={{ marginRight: '20px' }}>Address : </label>
                                    <input
                                        type="text"
                                        value={specificAddress}
                                        onChange={handleSpecificAddressChange}
                                        placeholder="Nhập địa chỉ cụ thể"
                                    />
                                    <input
                                        type='text'
                                        readOnly
                                        className="form-control"
                                        value={addressShip}
                                    />
                                    {/* <InputReadOnly
                                        value={` ${specificAddress} ${ward
                                            ? `${wards?.find((item) => item.ward_id === ward)?.ward_name
                                            },`
                                            : ""
                                            } ${district
                                                ? `${districts?.find((item) => item.district_id === district)
                                                    ?.district_name
                                                },`
                                                : ""
                                            } ${province
                                                ? provinces?.find((item) => item.province_id === province)
                                                    ?.province_name
                                                : ""
                                            } `}
                                    /> */}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                            </div>

                            <div className="card-body">
                                <h5 className="font-weight-medium mb-3">Products</h5>
                                {selectedProducts.map((s) => (
                                    <div className="d-flex justify-content-between" key={s._id}>
                                        <p>{s.name}</p>
                                        <p>{s.quantity}</p>
                                        <p>${s.price * s.quantity}</p>
                                    </div>

                                ))}
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">$10</h6>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-medium mb-3">Tổng tiền cho  {selectedProducts.reduce((total, o) => total + o.quantity, 0)} sản phẩm:</h5>
                                    <h5 className="font-weight-medium mb-3">${totalPriceValue}</h5>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">ToTal:</h5>
                                    <h5 className="font-weight-bold">${totalPriceValue+10}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Payment</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            name="payment"
                                            id="paypal"
                                        />
                                        <label className="custom-control-label" htmlFor="paypal">
                                            Paypal
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            name="payment"
                                            id="cash"
                                        />
                                        <label className="custom-control-label" htmlFor="cash">
                                            Cash
                                        </label>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={handlePayment}>
                                    Place Order
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

export default memo(CheckOut)