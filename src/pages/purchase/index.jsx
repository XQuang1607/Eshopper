import React from "react";
import { useState, useEffect } from "react";
// import HeadMeta from "@/components/HeadMeta";
import styles from "./Purchase.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { getTokenFromLocalStorage } from "@/utils/tokenUtils";
import axiosClient from "@/libraries/axiosClient";
import Link from "next/link";
import { BsFillCarFrontFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { ImArrowLeft2 } from "react-icons/im";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";

const App = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [order, setOrder] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Call it once on the client side
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "completed") {
      setStatusFilter("COMPLETED");
    } else if (tabName === "waiting") {
      setStatusFilter("WAITING");
    } else if (tabName === "canceled") {
      setStatusFilter("CANCELED");
    } else if (tabName === "delivering") {
      setStatusFilter("DELIVERING");
    } else {
      setStatusFilter("");
    }
  };

  const checkLoggedIn = async () => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        const response = await axiosClient.get("/user/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data.payload);
      } catch (error) {
        console.error("Error checking login:", error);
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  // const handleCancelOrder = async (orderId) => {
  //   try {
  //     const token = getTokenFromLocalStorage();
  //     if (token) {
  //       console.log('««««« 546546 »»»»»');
  //       await axiosClient.patch(
  //         `/user/orders/${orderId}`,
  //         {
  //           status: "CANCELED",
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       // Update the order's status locally
  //       setOrder((prevOrders) =>
  //         prevOrders.map((order) =>
  //           order._id === orderId ? { ...order, status: "CANCELED" } : order
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error canceling order:", error);
  //   }
  // };

  const handleCompletedOrder = async () => { };
  const handleCancelOrder = async () => { };

  return (
    <>
      {/* <HeadMeta /> */}
      <Header />
      <main className={styles.main}>
        <div className="container">
          {isMobile ? (
            <div>
              <Link href="/">
                <ImArrowLeft2 style={{ fontSize: "24px", marginTop: "10px" }} />
              </Link>
              <h3 className={styles.heading}>Đơn mua</h3>
            </div>
          ) : (
            ""
          )}

          <div className={styles.wrapperContent}>
            <div className={styles.navigation}>
              <div className={styles.container}>
                <div
                  className={
                    styles.link +
                    " " +
                    (activeTab === "all" ? styles.active : "")
                  }
                  onClick={() => handleTabClick("all")}
                >
                  All
                </div>
                <div
                  className={
                    styles.link +
                    " " +
                    (activeTab === "waiting" ? styles.active : "")
                  }
                  onClick={() => handleTabClick("waiting")}
                >
                  To Order confirmation
                </div>
                <div
                  className={
                    styles.link +
                    " " +
                    (activeTab === "delivering" ? styles.active : "")
                  }
                  onClick={() => handleTabClick("delivering")}
                >
                  To Ship
                </div>
                <div
                  className={
                    styles.link +
                    " " +
                    (activeTab === "completed" ? styles.active : "")
                  }
                  onClick={() => handleTabClick("completed")}
                >
                  Completed
                </div>
                <div
                  className={
                    styles.link +
                    " " +
                    (activeTab === "canceled" ? styles.active : "")
                  }
                  onClick={() => handleTabClick("canceled")}
                >
                  Cancelled
                </div>
              </div>
            </div>
            {order.map((p) => {
              if (statusFilter === "COMPLETED" && p.status !== "COMPLETED") {
                return null;
              }
              if (statusFilter === "WAITING" && p.status !== "WAITING") {
                return null;
              }
              if (statusFilter === "CANCELED" && p.status !== "CANCELED") {
                return null;
              }
              if (statusFilter === "DELIVERING" && p.status !== "DELIVERING") {
                return null;
              }

              return (
                <div key={p._id} className={styles.wrapperOrder}>
                  <div className={styles.headingWrapOrder}>
                    <Link href={`/user/purchase/order/${p._id}`}>
                      <BsFillCarFrontFill style={{ marginRight: "5px" }} />
                      View order progress
                    </Link>
                    {p.status === "WAITING" && <p>WAITING</p>}
                    {p.status === "DELIVERING" && <p>SHIP</p>}
                    {p.status === "COMPLETED" && <p>COMPLETED</p>}
                    {p.status === "CANCELED" && <p>CANCEL</p>}
                  </div>
                  {p.orderDetails.map((o) => (
                    <div key={o._id} className={styles.wrapperProducts}>
                      <Link
                        href={`/user/purchase/order/${p._id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                        }}
                      >
                        <img src={o.productId.cover} alt="" />
                        <div className={styles.nameProducts}>
                          <p>{o.productId.name}</p>
                          <p style={{ fontSize: "14px" }}>x{o.quantity}</p>
                        </div>
                      </Link>
                      <span className={styles.colorPrice}>{o.price}$</span>
                    </div>
                  ))}
                  <hr />
                  <div className={styles.wrapperTotal}>
                    <div className={styles.totalPrice}>
                      {/* <hr/> */}
                      <h4>Order Total: </h4>
                      <span className={styles.colorPrice} style={{ fontSize: '25px' }}>
                        {p.orderDetails.reduce(
                          (total, o) =>
                            total + o.price * o.quantity,
                          //  * (1 - p.discount / 100),
                          0
                        )}
                        $
                      </span>
                    </div>
                    <div className={styles.twoButton}>
                      <button
                        style={{ marginRight: "20px", padding: "0px 25px" }}
                        className={styles.btnDelivering}
                      >
                        <Link href="/cart">Buy Again</Link>
                      </button>
                      {p.status === "WAITING" && (
                        <>
                          <button
                            onClick={() =>
                              // handleCancelOrder(p._id, p.orderDetails)
                              handleCancelOrder(p._id)
                            }
                            className={styles.btnCancel}
                          >
                            Cancel Order
                          </button>
                        </>
                      )}
                      {p.status === "CANCELED" && (
                        <button className={styles.btnCancel}>Đã hủy</button>
                      )}
                      {p.status === "COMPLETED" && (
                        <button className={styles.btnCompleted}>
                          Đã nhận được hàng
                        </button>
                      )}
                      {p.status === "DELIVERING" && (
                        <button
                          onClick={() => handleCompletedOrder(p._id)}
                          className={styles.btnDelivering}
                        >
                          Đã nhận được hàng
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
export default App;
