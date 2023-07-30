import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import axiosClient from "@/libraries/axiosClient";


const Navbar = ({ productsOfCategoryShop }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Hàm xử lý đăng nhập
  // const handleLogin = () => {
  //   // Giả sử đăng nhập thành công, bạn có thể thay đổi logic này tùy thuộc vào hệ thống đăng nhập của bạn
  //   setIsLoggedIn(true);
  //   setUserEmail("user@example.com"); // Thay bằng email thực của người dùng
  // };

  // const handleLogin = async () => {
  //   try {
  //     const response = await axiosClient.post("/user/customers/login", {
  //       email,
  //       password,
  //     });

  //     // Kiểm tra phản hồi có chứa token hay không
  //     if (response.data.token) {
  //       // Lưu token vào localStorage 
  //       const token = response.data.token;
  //       setTokenToLocalStorage(token);

  //       // Chuyển hướng đến trang sau khi đăng nhập thành công
  //       router.push("/"); 
  //     } else {
  //       alert("Email hoặc mật khẩu không đúng");
  //     }
  //   } catch (error) {
  //     alert("Email hoặc mật khẩu không đúng");
  //     console.error("Error logging in:", error);
  //   }
  // };

  // Hàm xử lý đăng xuất
  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUserEmail("");
  // };
  return (
    <div>
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
            >
              <h6 className="m-0">Categories</h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
              id="navbar-vertical"
            >
              <div
                className="navbar-nav w-100 overflow-hidden"
                style={{ height: 410 }}
              >
                {productsOfCategoryShop.map((cate) => (
                  <Link className="nav-item nav-link"
                    // style={{ height: "80px" }}
                    key={cate._id}
                    href={`/shop/`}
                  >
                    {cate.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href="" className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">
                  <span className="text-primary font-weight-bold border px-3 mr-1">
                    E
                  </span>
                  shopper
                </h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <a href="index.html" className="nav-item nav-link active">
                    Home
                  </a>
                  <a href={'/shop'} className="nav-item nav-link">
                    Shop
                  </a>
                  <a href="detail.html" className="nav-item nav-link">
                    Shop Detail
                  </a>
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Pages
                    </a>
                    <div className="dropdown-menu rounded-0 m-0">
                      <a href="cart.html" className="dropdown-item">
                        Shopping Cart
                      </a>
                      <a href="checkout.html" className="dropdown-item">
                        Checkout
                      </a>
                    </div>
                  </div>
                  <a href="contact.html" className="nav-item nav-link">
                    Contact
                  </a>
                </div>
                <div className="navbar-nav ml-auto py-0">
                  {isLoggedIn ? (
                    // Hiển thị email và nút đăng xuất nếu người dùng đã đăng nhập thành công
                    <>
                      <span className="nav-item nav-link">{userEmail}</span>
                      <button className="nav-item nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  ) : (
                    // Hiển thị nút đăng nhập và đăng ký nếu chưa đăng nhập
                    <>
                      <a href={"/register"} className="nav-item nav-link">
                        Login
                      </a>
                      <a href={"/register"} className="nav-item nav-link">
                        Register
                      </a>
                    </>
                  )}
                </div>
                {/* <div className="navbar-nav ml-auto py-0">
                  <a href={"/register"} className="nav-item nav-link">
                    Login
                  </a>
                  <a href={"/register"} className="nav-item nav-link">
                    Register
                  </a>
                </div> */}
              </div>
            </nav>
            <div
              id="header-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" style={{ height: 410 }}>
                  <Image
                    // className="img-fluid"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7E_A2WQW-yYEkikxKCdKiuhG2Y4BThVveRA&usqp=CAU"
                    width="1000"
                    height="605"
                    alt="Image"
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: 700 }}>
                      <h4 className="text-light text-uppercase font-weight-medium mb-3">
                        10% Off Your First Order
                      </h4>
                      <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                        Fashionable Dress
                      </h3>
                      <a href="" className="btn btn-light py-2 px-3">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" style={{ height: 410 }}>
                  <Image
                    // className="img-fluid navbar_right"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEA8QDw8QDw8NDw8PDw8PDw8NEA8NFREWFhUVFRUYHSggGBonHRUVITEhJSkrLi4uFx8zOjMsNygtLisBCgoKDg0OFxAQFy0lHx0tLS0tLS0tLSstLS0vLS0tLSsrLS0rLS0tLS4tLS0tLS0tLS0rLSstKy0tLS0tLS0tLf/AABEIALABHgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBAYFBwj/xABEEAACAQIDAgoHBAgFBQAAAAABAgADEQQSIQUxBhMiQVFhcZGh0TJCU3KBk7EHFBXBIzNSYoKissJDY3OS8CREVKPh/8QAHAEAAgMBAQEBAAAAAAAAAAAAAQIAAwQFBgcI/8QANhEAAgECAgUJCQADAQEAAAAAAAECAxEEIQUSMUFRExRhcYGhscHhBhUiMlJTkdHwQmKSsiP/2gAMAwEAAhEDEQA/AEIcYQhO4fNh1lujKoligYJLIlN5l+nLCGVaZk6mUs6cJFgRxI1MOKXpkghAwBDBgYyDBkgkIMMGKWJhR4opA3FFFFIAa8V4jLmzsKH5TajmXp7Yk5qCuy2jRnWnqQKiIzbhf4GO6MN4t8DJ9o8JaNHkUkFQroWuKdJT0A2JY+6COkiZbanD4aoDRuoJYKrVWAG8kAnL4zLzt3+XvzOp7q+H58+rL9mhvFMxsvb9SsbjinGhsVsbHcdPrrNDRrhxcaEb1O8GXU8RCbstvSYsRgatCOtKzXRfvukyWCYN45MvMYxMGK8UIg0aPGMKAIyOETAYwitgkwGhGM0JWRtIHMlcyCqYyKZsrYhpUaTV2uZXJlq2GCbvIUIQBCEIAxJKRsZGIaGQW9mX6ZlhDKdNpaQylnQpyLCmSCQqZKDFNCJAYgYwjXgHuSgwxIgZIDAyyLJBHkYMe8Ue4RjXjEwGaQDYd5xtubdqUqVRUYU6S5xUq2zs9z6KDw3XM6qG5t2jvEwvDDFKaxpAjJh0BI6arC+vYLd5mHFy+JQ7Tt6Ip/DKp2efmcg1auJYl82S9lphrl/fPPvGm6anY3AzjTSrJlpmj6TgXRjuKAbmG8Humb4KUHr1FVOeyi28Em1x2DN3T0s7Vqoy0MN93c0yEOGOdK6gDfoTbTXVZle2yO3COVzCbZ2Y+y2Dob01fPTI9iTZ6TX6yrA82s1WzMQXYEG6PTJva3J3j6zk8P8AGNUtTKKqpU4pnZwHaq1MnKibyN1ybfGXOBtUNgqB9bKVPYGIj4eDlUj0Z9hj0nUjToT/ANlZdf8AZ9h3bxiYrxrzr2PJXHjRRSEFBJjmAxhFbBJjRGDII2MYxMcyJjCIwHMqVWlio0pVmlkUZK0siBzITJWMhlhlQcQijiQgYjrAWGIRWWaBlpDKVMy1TaVyWZqoyyLaGSCV0aTK0rZsjIkBj3gCFeAsuGDJAZCDDDQMKdiQGPeADETBYsuGTIXeJ3lWvV39kZIrqTsjopgyWXl2zUmqXA9FiCFB+IE8j2xnpYvG06rB3FSqpZdzZecdVgNJ7bhqqZyLrdhQGXqCZvOeXfaFh1+8UEAGdcK9SqRvL1qzvqefe1pxp1eUd3wPaUMJHDRcI8X5Lyz6QPs7cpVFQi4pi9hvJP8Aw989KwW26VZqlWnTW9O6VByFxDdQQkNbn138155ZwfNfCWxAQ1KOq1VXeBfePCbjHY/B4nD/AHinWw9lUljUYowAF8pK66dBlV82bo2cUmcLh3trAOrulO+KqPSyO1FqdTIjqXUkjcLfzDpk3Ah/+jpdeY/Am4mFwitXR6zkWJ4qnT1tSpXZrAHnJNzNHsPGfdkoqpLUhTAqByBxQvbQ+t1D4XmrDzhTk3JnI0nh62KhGFGN3e/Yk11Lrdluve19wrS7gqQc5SBduexunWB63WJy6NUNuYNboYNOns3DNUYFdAliW6COcdc31fkbTt0nnMGv/vGMoN7mtj6b32W252ttutpJi8KUVSQBYsr259bjw+kqyXaG2adSpUoJc5WGoFxyQcxvzC5Ale8TDVHOF3xZp0nQhRr6sdjSfl32v2jmCYi0AmXnObEYDGJmgXhK2xEwGMcmRuYxXJkVZpSqGT12lRjLYow1ZXYDGCY5gGEVBxxBhSECEMSIQxCKyVZZpmVQZNTMDGpuxbQyZTK6GTKZUboslBhAyMGFeKW3DBhiRBoYMAyZIDHLQLxi0g1yKs1pg9tcIa7ugolqdMcl7l+XY3DDLoGvvHVNtiXnmm08FWohuMyuXJqDLU1pAnNlXk8rt65jxrkoxs8nt8vM9X7Gww1TE1lVinUSThe7yz1stn05vNbrZnpPBPhb94SzIpYZQbG1iFynf3/HqnH+0amq1qGIbkrWRaR5+UjEgfEN4GZrgStVMdk9R0LEA/skWt3zVfbDRtg8Nl3NiBmPP+re1py1lKx3cVS5ObjbYwvs5rriMPXQgXzk5TvCndPNuGOyaWGxFS3pGs2nNyTzCdTg7tR8OyV6RAdNHAuBUS+pI+o+M5nDbE8bjHdRZaoDoDrbMLnXtvHhdSMs7OBc2RWp1QUDZGds6aXGYDd9PGSbRxLZnUajihm6GNxe3QeVMvhc1rgkEam/qkHQj6eE0Oyaoravdqg6r9lzvtuPTpJUVkaME9eoop2vdflW/v1c2nBKuLFWa7sSdwCFQ24D0r685N5vqlRqeBYpbO11Q7tXey/UTzDYZptiAysv6FRVP7Vqdi1+caEDXrno22sVTGHw9NXGtSkLG6k210vv3S2DcqUIPLN+X7eZRpalClj69eEtaXJxctrtJKWXaoRdru3U0cvBYZaS2GpOrsd7N0//ACWc0gDx807CikrLcfP5VJTblJ3b2viGTAJjXjGFIRsRMaNBZoRLjMZDUaEzStVaMkUVJ2RDUaRtHYyNjLDIswTBMcwDIWJEkeNEJBRxDWBCWEBIJIjWkYjiQTYW0eTI0qIZOhiSRrpzLQaODI1aPeIX3JLxw0AR7yDEoaR1HgFpBWqyJAlOyIcTWnGxGzHxFVVpleUgD572G+5tz7xp1y9WeVRiTTYMNCrW/hIyn+2U42GtQkltWf4Nns9jZ4fSNOqna94361Zd9iXg/sSpg8eiO7VlNKpxdYi2l05BH0na+1XC8Zs1eY061Nh/MP7pPgqnGHDHnCsx8B+Zlr7QaTNs2uVF2pinUAHPkqKxHcDOBF3bPolWpKpKLlnu6XwPDWZqaj9rMAOgr0fC8sbUwTBcKzb6uHzAmx3VDF+HtVOYo6BWuQwADdk7mLpU6wAe3I1F/VHQI7lZo14fQ9arTlJqzysnlfj6GcbDoqhWbM5LehYnLYWJHQbKbfu9cl2LWVMzKy50NyNQcp3qR2/WdfZ+z1pl2z58wAAIBCgX3d8j2hs8VjT4pbVMwQaXvmNrGF1E8ix6EqwpOo5JSW79PZ0mh4G4jjsQl19NmQMOi2Yg840B7p6Nwse1Ol/qp9ZwOBfBtsK9LOAMlNjbQsajN6R6NNLTrcM6tlpDpr0v6xHpyd49a8UcHGR1o1ZPNyi7/wDLRyFeHmlGlWk4qTvtWPnMaiaLGaImQZ4+eCw2uSFpGxjF5GxhSFlMTtKzmG7SFjLEjLOV8gGMAwmMjMhENAMImCYB0SRxGihFDiWCDHEICURxBEISCMkUyem0qgyRGgauNCVmWhDDSBWhZoljSpFgGETIA0fNAWKSFUaUaz3lmq8pVDHijNVld2K9ZpzcU+/sMu1zONtKsVUkancg/e/5r8IlRq2ZpwsXrK23cegcFxnGfoVVHwFz9ZodrUhUwtZD61J171ImE+zLaIOHSmzXflMb72uSb+M3O0MQqUXZyFVFZmJ3BQLkzzKjqto+nuV1GXaeQo+YcnU3N+qA2HDX5jOfSonjDUp1qKu2ZshPqk3sZ1Ve4B5+exB8YGrbD30JOfzKxDTfQjo3yzsbEBMThy27jqSd7aflKmJFmB5mBB7bXEm2RTD4rDq3oisC/wDp06bVH/lBjRV2kZcfU1MPVfCL8Ge1ZQHNvVWmCOoi4PiR8JluF5apVw9JBmbMapA32UE/lLdLhFTyYTEMf11ELUAF75TlqAW51IDd3TKGIV6+JxRF1qUVH3cjnVcrFlPQQQRNMIPlEnuef76j53iKsebScXdyjZW2u62Lpts7DjIZKGl3F0xXX7xSWxJC16dvQqHRSBzht/UbjolFgQbEEEbwRYzvp3PmtWlyb23T2Pc1ufpud080Sh4eeQXhZobCqZIWgM0YmATJYDmJjImMMmRGECBMGOYjAWAGDHMGAdE0UaPCIKOIMISECBhiRiGIRWGpjgwRHBkFJQYYMhBhAwBUiYGFmkIeFmgsWKQ1RpVqSVzIKh7e4xipySd2ypiDODjmzM/7FJCOys6fkh/nndxalQWJUAC55ag27N0433QNRF6mU4gM7gAM16pzPbXXeQOyZqkr5I9PovQuPxDvSoSd7Ztaqz2u8rLo27znbE2icJVVwCcio+UaHi2Gq/Bg3fNJt7hkm0qC4LDh0bEOFrOy6JQGrdt/OUcPhaSlnyhjl4u76aX5hf8AORUSw4zcoeoTyTpktZZklhlKakz6Ho/2dxqhqV5qKfC8muPBZvpaFU2SpSjxjU6palTzoyhnouRqubLqR1EjSXaOzkp4eqyhiaKhraJcXUHQC24+EipD6zubKpcYmJTppOv8Rv5CF4Wkk8j1OJpujQbhJ60V8ztftyt3FHgjsZNo1GpvVKLSyM4JuzoWtyRa17239M9JwHBjCYBmZDUY18tJuNyMupsNLab7fxGeXcA8ZxWPRfbJUpnttnXxQd89w2lQFWkw/aW4nPnTUa0kt1ms3vv08UzxtbSGIr2jVnlvSsl3HOqYOiQFNKmVBJClEsCd5Atv0HdCWhTBUqiqyLlDKADk1svZruj4aoXRWPpHRvfBs3iJIRHuZHCN80rojoUkQ6KACDcDnvK1bZtFiWamCTvN285bjxYQjB3gkn0Kz7vz1gnThNWnFNdKT9DJ8INnrSyvTXKuocC5AM4t5vMbhhVpuh9bwO8HvmCdSCQdCCbjoInXwdVyhZ7V4HiPaDBRoV1UgrRmupJq1/yrPruK8EmMTGvNZwLDMYBhMYBMBYhjGMYmMTAMkMYEcxryDk8aNHhKx4oopAjiEIF4QkFJLxAwBDEItgo4gAwgYbi2CvHg3j3kZAMU+Wm7hbspy2I6QxOu/eBOJW2nWfe7jqDnTxnV2i36GoOmon9Dec4EzTV5P+3H232AwVBaLjieTjrylP4rLWsnZK9r2ye8eovGKyOWKupU662IiaJTGML2Hu7fFf8Av7MlvZbdMhj3iiyClYlpuAJouCugqHpI8JmJq+C1HNSYj9oiLPYYcfaNF9LRikc4fHF93EYlbe6r6+E+htn1M1JOfk27tPyngXCvDFMVWFv1mV+9AD4qZ7JwGxvH4Gg538WA3vWF/G8wYiFpwkt6af5uvFnzyvDVnJdLLQGSs6c1QcYvvDRvDLJWEq8IWNM0aw/wqnK60Is3heW9Du1B3HpEo32Ha+FS4+X8iIxGE0CEUYzJ8J8LkqCoPRq3v7wAB/KawyhtnC8dQdQLkcodXV3XEuw9TUqJnO0rhOc4WcEviWa61+1ddph4xMAGImdo+crMFjBMcxjAOgCYJhGMYB0MY0eAYBia8K8CK8IjQUUaPIAeOIMISADBiBgiFCAO8eAI94RQrxEwLwS0hLEO1f1PvOv0M4s622H/AEdIdV+4mcmUN5n6B9jaPJaEwy4py/6lKXmKKKKKenGiiihIKbHggP0R94/WY6bTgqLYcnrb85XU2HO0o7UO1Ga4cH/qUPTTKj+Fif7psPsgx2bD1qJ/wapt7rcr+6ZLheM2R+h3W/aL/lL32X4zi8bUpc2Io3A601P5SnExvST+l+OXmeJx9PUrtdXgvM9P27rRbqKnxt+cg2RWzUlHOnIPw3eFpZxbXQjeDvkGDohQSBa9vCYN5QrcnbpLTCREQyZXq1bQiDtABtGRri8ZjIMYrbuF4quwHoNyl+I18vhOdeaXhTQui1PZ3Hfa0zF52MPU16afYfO9LYXm+LnFLJ/Eup/p3XYOYJMRMAmXHOSHJgExExEyDiJgExEwYB0iyRGjxoSoUUUUhBXhiBEDIQkEeMIhCKw4rwbxiZAWHJkdRomaQu0A6W8g2k/JpD/KB/naUZe2seUo6EH1PnKEztn6O0FR5HRmFpvdTh/5Qo4jRxIjqiitEsMaA3Nh1m0dbBW7K4Imo2LjAlF6ZNjZSNOYgE/nMi2NpL64b3NfGXk21h2PpOhsNWW2oAB1F9NJVVnHLMwYupSqJQcunwOhwlZTQUKD+tBJPusB42nF2FjTRxuGqDTKxU+6VNxOlj6wrYarxTJUZEzgKwOZl5Q7N0z4QhM5XK4CuBcErzjdDblKUox2tP8ANsu88lpenq1U+K8Gz3RKxYSOpXylSeZlv1KTYytweqtVw9CpvL01uf3hofEGFtV2p5XyZkDDjP3RfonHTurmKNm+s6GIrKt7kC0pVK4PPJUwlA2YLmB1BZma/eZOlBB6ij4CHMr+FFeg2hjsTzA90tgAc0FnhsC6ObjcM1Wm9PIeWLXNhY8x75gdQSDoQbEdc9Jqv0mw7pheENJVruVIK1LMuUg2JGo0679824Kdm48czzntHhnKnCuv8Xqvqez8PxOfeM0a8YzonkLCMEmImMZB0CTGjmBeAYMbQw/tqPzqXnEdoYf/AMij86l5zzDLFlmVYl8Dse5l9zu9T0/8Qw/t6PzaXnF+IYf29H51LznmGWLLJzl8Ce5l9zu9T078Qw/t6PzqXnH/ABDD+3o/Opec8wyxZZOcvgT3Mvud3qeoDaOH9vR+dS84X4jh/b0fnUvOeW5YssPOnwB7lX3O71PUfxHD+3o/OpecZtpYf29L51Lznl+WMRBzl8CLQq+53ep6Y20MP7el86l5yCrtCj7alvH+LT855xaMRBzl8B/c6tbX7vU9E2jjaZqH9LT/AN6DS/bKbY+gu+tS+YCZi8HxQqKayl6YzZlG88kgW+Np38KdiM1qlLEUlJFiWZ0AAN72Jbf0dXXKeWa3H0yn7UOMIwjSWSSzfBW4F99sUBua/wAVX6yH8YB3Gko6S+a3dacs1tk5nIo4oplTIpdc2bIc1yDpyrdPwlitjNi8U6JhsRnZnK1KgzFdCBqHBI3adZ3xXWmVS9pK8srLs9UyzVxqEEHFf7MiDwInKq7Soje+Y+6X8ZPhcRsbi6Yq4fEmpkQVWWwGcIActmG83O6S0cRsUWJoYj9HqFIBNS5BANmtca3voea0rcm9rMktL1ntzf8As7+CRzH2yPVQntIX6SH8RqtuFNfgDOtRr7Fy2fD4nMbFiGvlPOF5fXvPQOuRYapshUAqUsVUcKtyDkDNY3Pp6C+vYQOYky5mnpKvL/P8WXlcWyg2cPUxCKB1omnwnWXHUlqPxlVHpuzWyOhOUGwtra052GxWxhmFTD17MEsVOZlbjAXAJYaAKADr6TSWi2wytzTrq2dUCsz3KnfUJBsFA3jffcJfDEOCtFFDrye3xZ6v9n23cOMMyNXpKFyuivVRSFIsRYnpU987tfhDgkUtUxWHAN7jjUYnqCg3M8LXG7GXNloYlSwy3BBsBls2rbzY9HpTO4ypTNRzRzcXcZS4AciwuTv57nfMahb+/tmwCrWWw92bh7hKV1w6B1vcZ6yUwDz5RrppKlf7RHPojDL2vnP9QE8NuYo2oLLEN7j2Stw4xDf9zSp9SClp33nPrcJKlT0sd/7wg7gZ5escCOoR3mederb4Gl1q/ml3HpP3+k2r10c/5lZHHcTJV2hh/bUvm0/OeZ2j5ZphVUMoxOLXwE68tapVb7PDOy7D04bRw/tqXzaXnH/EcP7al86l5zzHKI1pZznoM/udfX3ep6YdoYf21L5tLzjHaFH21L5tPznmuWLLBzl8A+6F9fd6npBx1D21L5lPzjffqPtqXzKfnPN8oiyyc4fAb3Svr7vU/9k="
                    width="1000"
                    height="605"
                    alt="Image"
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: 700 }}>
                      <h4 className="text-light text-uppercase font-weight-medium mb-3">
                        10% Off Your First Order
                      </h4>
                      <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                        Reasonable Price
                      </h3>
                      <a href="" className="btn btn-light py-2 px-3">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#header-carousel"
                data-slide="prev"
              >
                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                  <span className="carousel-control-prev-icon mb-n2" />
                </div>
              </a>
              <a
                className="carousel-control-next"
                href="#header-carousel"
                data-slide="next"
              >
                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                  <span className="carousel-control-next-icon mb-n2" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
