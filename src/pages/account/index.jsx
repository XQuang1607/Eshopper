import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { getTokenFromLocalStorage } from '@/utils/tokenUtils'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import axiosClient from "@/libraries/axiosClient";
import SellectAddress from '@/components/SellectAddress'
import { apiGetPublicDistrict, apiGetPublicProvinces, apiGetPublicWard } from '@/services/app'
import Image from 'next/image'
import styles from "./Account.module.css";

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Account = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [customerId, setCustomerId] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // birth
    const [birthday, setBirthday] = useState('');

    const [showAccountInfo, setShowAccountInfo] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);

    // Passwords
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleCurrentPasswordToggle = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleNewPasswordToggle = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        const token = getTokenFromLocalStorage();

        if (token) {
            try {
                // Giải mã token để lấy thông tin customerId
                const decodedToken = jwt_decode(token);
                const { _id: customerId, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, address: address, gender, birthday: birthday, } = decodedToken;
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

    const handleChangePass = async (event) => {
        event.preventDefault();

        const token = getTokenFromLocalStorage();
        try {
            const response = await axiosClient.patch(`/user/customers/changePass/`, {
                currentPassword,
                newPassword,
                confirmPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            if (response.status === 200) {
                alert("Password changed successfully");
                // Clear password fields after successful change
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                alert("Failed to change password. Please check your input.");
            }


        } catch (error) {
            alert("An error occurred while changing the password.");
            console.error("Change Password error:", error);
        }
    }

    const handleUpdateInfo = async (event) => {
        event.preventDefault();

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
                // alert("Thông tin đã được cập nhật thành công");
                alert("Information has been successfully updated");

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
                // alert("Cập nhật thông tin không thành công");
                alert("Update failed");
            }


        } catch (error) {
            // alert("Đã có lỗi khi cập nhật thông tin");
            alert("There was an error updating the information");
            console.error("Update error:", error);
        }
    };

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
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGK9WrwHhtuRafGZv5f9loqH6JGiRQypvmQ&usqp=CAU" width={250} height={220} alt="" />
                        <div >
                            <p style={{ display: "flex", margin: '30px 0' }}
                                onClick={() => {
                                    setShowAccountInfo(true);
                                    setShowChangePassword(false);
                                }}
                                className={styles.info_account}>My Account</p>
                            <p className={styles.change_pass}
                                onClick={() => {
                                    setShowAccountInfo(false);
                                    setShowChangePassword(true);
                                }}
                            // onClick={() => setShowChangePassword(true)}
                            >Change PassWord</p>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12">
                        {showAccountInfo ? (
                            <>
                                <h4 className="font-weight-semi-bold mb-4">My Profile</h4>
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
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Address</label>
                                        <input className="form-control" type="text" placeholder="Address"
                                            value={address}  // Use the address state here to display the previously saved address
                                            onChange={(e) => setAddress(e.target.value)}

                                        />
                                    </div>

                                    <button className="btn btn-primary" onClick={handleUpdateInfo}>
                                        Update Information
                                    </button>

                                </div>
                            </>
                        ) : null}
                        {showChangePassword ? (
                            <>
                                <h2>
                                    Change Password
                                </h2>
                                <div className='row'>
                                    <div className="col-md-12 form-group">
                                        <label>Current Password</label>
                                        <div className={styles.password_input}>
                                            <input className="form-control"
                                                type={showCurrentPassword  ? 'text' : 'password'}
                                                placeholder="Enter your current password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                            <div className={styles.password_toggle} onClick={handleCurrentPasswordToggle}>
                                                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label>New Password</label>
                                        <div className={styles.password_input}>
                                            <input className="form-control" 
                                             type={showNewPassword  ? 'text' : 'password'}
                                                placeholder="Enter your new password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                             <div className={styles.password_toggle} onClick={handleNewPasswordToggle}>
                                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label>Confirm New Password</label>
                                        <div className={styles.password_input}>
                                            <input className="form-control" 
                                             type={showConfirmPassword  ? 'text' : 'password'}
                                                placeholder="Enter your new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                             <div className={styles.password_toggle} onClick={handleConfirmPasswordToggle}>
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" onClick={handleChangePass}>
                                        Change Password
                                    </button>
                                    {/* <div className="col-md-12 form-group">
                                        <label>Confirm Password</label>
                                        <input className="form-control" type="text" placeholder="Enter your current password" />
                                    </div> */}
                                </div>
                            </>
                        ) : null}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Account