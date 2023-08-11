import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { getTokenFromLocalStorage } from '@/utils/tokenUtils'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import axiosClient from "@/libraries/axiosClient";
import SellectAddress from '@/components/SellectAddress'
import { apiGetPublicDistrict, apiGetPublicProvinces, apiGetPublicWard } from '@/services/app'


const Account = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [customerId, setCustomerId] = useState(null);

    // address
    const [specificAddress, setSpecificAddress] = useState('');
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [reset, setReset] = useState(false)

    // birth
    const [birthday, setBirthday] = useState('');


    useEffect(() => {
        const token = getTokenFromLocalStorage();

        if (token) {
            try {
                // Giải mã token để lấy thông tin customerId
                const decodedToken = jwt_decode(token);
                const { _id: customerId, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, address: address, gender, birthday: birthday } = decodedToken;
                // setCustomerId(customerId);
                // setFirstName(firstName);
                // setLastName(lastName);
                // setEmail(email);
                // setPhoneNumber(phoneNumber);
                // setFullName(firstName + " " + lastName);
                // setAddress(address);
                // setGender(gender);
                // const formattedBirthday = birthday.split('T')[0];
                // setBirthday(formattedBirthday);
                const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};

                setCustomerId(customerId);
                setFirstName(storedUserData.firstName || firstName);
                setLastName(storedUserData.lastName || lastName);
                setEmail(storedUserData.email || email);
                setPhoneNumber(storedUserData.phoneNumber || phoneNumber);
                setFullName((storedUserData.firstName || firstName) + " " + (storedUserData.lastName || lastName));
                setAddress(storedUserData.address || address);
                setGender(storedUserData.gender || gender);

                const formattedBirthday = (storedUserData.birthday || birthday).split('T')[0];
                setBirthday(formattedBirthday);

            } catch (error) {
                console.error("Error decoding token:", error);
                setCustomerId(null);
            }
        }
    }, []);

    const handleUpdateInfo = async () => {
        const token = getTokenFromLocalStorage();

        try {
            const response = await axiosClient.patch(`/user/customers/profile/`, {
                firstName,
                lastName,
                phoneNumber,
                email,
                address,
                gender,
                birthday,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            if (response.data.payload) {
                alert("Thông tin đã được cập nhật thành công");

                // Store the updated user data in localStorage
                const updatedUserData = {
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    address,
                    gender,
                    birthday,
                };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
            } else {
                alert("Cập nhật thông tin không thành công");
            }
        } catch (error) {
            alert("Đã có lỗi khi cập nhật thông tin");
            console.error("Update error:", error);
        }
    };

    // Begin Address
    const handleSpecificAddressChange = (event) => {
        setSpecificAddress(event.target.value);
    };

    // const updateAddressValue = () => {
    //     const newAddress = `${specificAddress} ${ward
    //         ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
    //         : ""
    //         } ${district
    //             ? `${districts?.find((item) => item.district_id === district)?.district_name},`
    //             : ""
    //         } ${province
    //             ? provinces?.find((item) => item.province_id === province)?.province_name
    //             : ""
    //         }`;
    //     setAddress(newAddress);
    // };

    // useEffect(() => {
    //     updateAddressValue();
    // // }, [specificAddress, ward, district, province]);
    // }, [ ward, district, province]);

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
    return (
        <>
            <Head>
                <title>Account</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-3 col-md-12">
                        img
                    </div>
                    <div className="col-lg-9 col-md-12">
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
                                <label>E-mail</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="+123 456 789"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Gender</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="+123 456 789"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}

                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Date of Birth</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={birthday}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address</label>
                                <input className="form-control" type="text" placeholder="Doe"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
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
                                
                            </div>
                            <button className="btn btn-primary" onClick={handleUpdateInfo}>
                                Update Information
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Account