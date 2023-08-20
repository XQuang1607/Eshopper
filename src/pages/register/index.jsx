import React, { useState } from 'react';
import axiosClient from "@/libraries/axiosClient";
import { setTokenToLocalStorage } from "../../utils/tokenUtils";
import { useRouter } from "next/router";
import styles from "./register.module.css"
import Link from 'next/link';


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Female");
  const [showPassword, setShowPassword] = useState(false);
  // birthday
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");

  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
        // alert("Email hoặc mật khẩu không đúng");
        alert("Email or password is incorrect");
      }
    } catch (error) {
      alert("Email or password is incorrect");
      console.error("Error logging in:", error);
    }
  };

  const handleSignUp = async () => {
    try {

      if (!dayOfBirth || !monthOfBirth || !yearOfBirth) {
        // alert("Vui lòng nhập đầy đủ ngày sinh");
        alert("Please enter full date of birth");
        return;
      }

      // Chuyển đổi ngày sinh sang định dạng phù hợp (ví dụ: "yyyy-mm-dd")
      const birthday = `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`;

      const response = await axiosClient.post("/user/customers/register", {
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        password,
        gender,
        birthday,
      });

      if (response.data.payload) {
        alert("Sign Up Success!")
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setAddress("");
        setPassword("");
        setGender("Female");
        setDayOfBirth("");
        setMonthOfBirth("");
        setYearOfBirth("");
      } else {
        alert("Registration failed");
      }
      console.log('««««« response.data.payload »»»»»', response.data.payload);
    } catch (errors) {
      // alert("Đã có lỗi thông tin đăng ký", errors);
      alert("There was an error in registration information", errors);
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
                {/* Sign-in section without Bootstrap */}
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
                <Link href={'/'}>Forgot password?</Link>
                <input type="submit" className={styles.button} defaultValue="Login" />
              </>
            ) : (
              <>
                {/* Sign-up section with Bootstrap */}
                <div className="row">
                  <div className="col-md-6">
                    <h5>Enter First Name </h5>
                    <input type="text" value={firstName} onChange={handleFirstNameChange} placeholder="First Name" />
                  </div>
                  <div className="col-md-6">
                    <h5>Enter Last Name </h5>
                    <input type="text" value={lastName} onChange={handleLastNameChange} placeholder="Last Name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h5>Enter Email </h5>
                    <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                  </div>
                  <div className="col-md-6">
                    <h5>Enter Phone Number </h5>
                    <input type="text" value={phoneNumber} onChange={handlePhoneChange} placeholder="Phone Number" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h5>Enter Address </h5>
                    <input type="text" value={address} onChange={handleAddressChange} placeholder="Address" />
                  </div>
                  <div className="col-md-6">
                    <h5>Create a Password </h5>
                    <div className={styles.password_input_wrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Create a password"
                        className={styles.password_input}
                      />
                      <span
                        className={styles.password_toggle_icon}
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h5>Choose Gender</h5>
                    <label style={{ width: '30px', height: '10px', marginRight: '60px' }}>
                      <input type="radio" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} />
                      Male
                    </label>
                    <label style={{ width: '30px', height: '10px' }}>
                      <input type="radio" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
                      Female
                    </label>
                    {/* You can add more options for different genders if needed */}
                  </div>
                  {/* <div className="col-md-6 form-group" style={{ display: 'flex' }}>
                  <h5>Choose Gender</h5>
                  </div> */}

                 
                  <div className="col-md-6 form-group">
                    <h5>Date of Birth</h5>
                    <div style={{ display: 'flex' }}>
                    <select
                      className="form-control col-md-4"
                      value={dayOfBirth}
                      onChange={(e) => setDayOfBirth(e.target.value)}
                    >
                      <option value="">Select day</option>
                      {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      className="form-control col-md-4"
                      value={monthOfBirth}
                      onChange={(e) => setMonthOfBirth(e.target.value)}
                    >
                      <option value="">Select month</option>
                      {Array.from({ length: 12 }, (_, index) => index).map((monthIndex) => {
                        const monthName = new Date(0, monthIndex).toLocaleString('en', { month: 'long' });
                        return (
                          <option key={monthIndex} value={monthIndex + 1}>
                            {monthName}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-control col-md-4"
                      value={yearOfBirth}
                      onChange={(e) => setYearOfBirth(e.target.value)}
                    >
                      <option value="">Select year</option>
                      {Array.from({ length: 2023 - 1950 + 1 }, (_, index) => 1950 + index).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <input type="submit" className={styles.button} defaultValue="Signup" />
                  </div>
                </div>
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