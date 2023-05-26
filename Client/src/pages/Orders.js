import React, { useState, useContext, useEffect } from "react";
import HomeNav from "../components/HomeNav.js";
import { store } from "../App.js";
import "./css/Orders.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function Orders() {
  const {
    userdetails,
    setOrderslist,
}= useContext(store);
  const [orderitems, setorderitems] = useState([]);
  const navigate = useNavigate();
  
  const getorderdetails = async () => {
    Axios.get(`https://ays-backend.vercel.app/ordersbyuser?uemail=${userdetails.email}`,{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((res)=>{
        if(res.data.auth==true){
          setorderitems(res.data.orders);
        }
        else{
      
        }
    })
    setOrderslist([]);
    orderitems.map((item) => {
      setOrderslist((prevlist) => {
        return [...prevlist, item];
      });
    });
  };

  useEffect(() => {
    if (userdetails.length === 0) {
      navigate("/ays/login");
    }

    getorderdetails();
  }, [userdetails,orderitems.length]);

  return (
    <div>
      <HomeNav />
      <div style={{ marginTop: "80px" }}></div>
      <div className="cart-header" style={{ display: "flex" }}>
        <h1 style={{ "margin-top": "60px", marginLeft: "50px" }}>
          <i style={{ marginRight: "20px" }} class="fas fa-cubes"></i>
          Orders
        </h1>
      </div>
      <hr style={{ width: "900px", height: "2px" }}></hr>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {orderitems.length > 0 ? (
          <div className="orders-card">
            {orderitems.map((item, key) => {
              return (
                <div
                  className="order-item"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <img style={{ width: "200px" }} src={item.iimg} />
                  </div>
                  <div>
                    <h1>{item.iname}</h1>
                    <p>Ordered on {item.ord_date}</p>
                  </div>
                  <div>
                    <p>
                      {item.status === 1 ? (
                        <button class="btn btn-success">Completed</button>
                      ) : (
                          item.eemail == "" ?(
<button class="btn btn-danger">Cancelled</button>
 ):(<>                         
  <button class="btn" style={{backgroundColor:"orange",color:"white"}}>Pending...</button>
                          </>)
                      
                      )}
                    </p>
                  <p style={{ marginTop: "100px" }}>
                    <Link to={`/ays/orders/${key}`}>
                      {" "}
                      <h6>
                        order details
                        <i
                          style={{
                            fontSize: "15px",
                            marginRight: "30px",
                            marginLeft: "3px",
                          }}
                          class="fa-solid fa-chevron-right"
                        ></i>{" "}
                      </h6>
                    </Link>
                  </p>

                </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 style={{ marginTop: "100px" }}>
            No Orders Placed <i className="far fa-meh-blank"></i>
          </h1>
        )}
      </div>
    </div>
  );
}

export default Orders;
