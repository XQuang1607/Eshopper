import React, { useState } from 'react';
import axiosClient from "@/libraries/axiosClient";
import { setTokenToLocalStorage } from "../../utils/tokenUtils";
import { useRouter } from "next/router";
import styles from "./register.module.css"


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();

    handleLogin();
  };

  const handleSubmitSignUp = (event) => {
    event.preventDefault();

    handleSignUp();
  };

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post("/user/customers/login", {
        email,
        password,
      });

      // Kiểm tra phản hồi có chứa token hay không
      if (response.data.token) {
        // Lưu token vào localStorage 
        const token = response.data.token;
        setTokenToLocalStorage(token);

        // Chuyển hướng đến trang sau khi đăng nhập thành công
        router.push("/"); 
      } else {
        alert("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      alert("Email hoặc mật khẩu không đúng");
      console.error("Error logging in:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axiosClient.post("/user/customers/register", {
        // firstName : "Nguyen",
        // lastName : "Cuong",
        // phoneNumber : "0123123123",
        // email :"cuong@gmail.com",
        // address : " 30 Phan Chau Trinh",
        // password :"123456",
        firstName ,
        lastName ,
        phoneNumber,
        email,
        address,
        password,
      });

      if (response.data.payload) {
        alert("Đăng ký thành công")
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setAddress("");
        setPassword("");
      } else {
        alert("Đăng ký không thành công");
      }
      console.log('««««« response.data.payload »»»»»', response.data.payload);
    } catch (errors) {
      alert("Đã có lỗi thông tin đăng ký", errors);
    }
  };

  const [isLogin, setIsLogin] = useState(true); // Ban đầu hiển thị form đăng nhập

  const toggleForm = () => {
    setIsLogin(!isLogin); // Khi click vào liên kết "Signup" hoặc "Login", chuyển đổi giá trị của isLogin
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`${styles.login} ${styles.form}`}>
          <header>{isLogin ? 'Login' : 'Signup'}</header>
          <form onSubmit={isLogin ? handleSubmitLogin : handleSubmitSignUp}>
            {isLogin ? (
              <>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
                <a href="#">Forgot password?</a>
                <input type="submit" className={styles.button} defaultValue="Login" />
              </>
            ) : (
              <>
                <input type="text" value={firstName} onChange={handleFirstNameChange} placeholder="Enter your First Name" />
                <input type="text" value={lastName} onChange={handleLastNameChange} placeholder="Enter your Last Name" />
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
                <input type="text" value={phoneNumber} onChange={handlePhoneChange} placeholder="Enter your Phone Number" />
                <input type="text" value={address} onChange={handleAddressChange}  placeholder="Enter your address" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Create a password" />
                <input type="submit" className={styles.button} defaultValue="Signup" />
              </>
            )}
          </form>
          <div className={styles.signup}>
            <span className={styles.signup}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <label htmlFor="check" onClick={toggleForm}>
                {isLogin ? 'Signup' : 'Login'}
              </label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm