import React, { useState, useContext, useEffect } from "react";
import HomeNav from "../components/HomeNav.js";
import { store } from "../App.js";
import CartItem from "../components/CartItem.js";
import "./css/Cart.css";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Axios from "axios";

function Cart() {
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [stateMsg, setStateMsg] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const [address1Msg, setAddress1Msg] = useState("");

  
  const {cartItems,setCartItems,userdetails,setUserDetails,orderslist,setOrderslist}= useContext(store);
  const [orderItems,setOrderItems] =useState({add_name:"",add_email:"",add_phone:"",add_address1:"",add_address2:"",add_state:"",add_pincode:"",add_date:"",add_orderItems:[]});
 
  const navigate = useNavigate();
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  
    setOrderItems({ ...orderItems, [name]: value });

    var date=new Date();  
    var day=date.getDate();  
    var month=date.getMonth()+1;  
    var year=date.getFullYear();  
    var today=day+"-"+month+"-"+year;
      
    var h=date.getHours();  
    var m=date.getMinutes();  
    //var s=date.getSeconds();  
    var time=h+":"+m;
    var dateTime=today+" "+time;
    setOrderItems(previtem=>{
      return {...previtem,add_date:dateTime,add_orderItems:cartItems}
      })
  };

  const submitHandlerCart=(e)=>{
    e.preventDefault();
  
    if(cartItems.length <= 0){
      alert("Please add items to cart")
    }
    else if(orderItems.add_name===""){
      setNameMsg("Enter your name!");
    }
    else if(orderItems.add_email==="" || !orderItems.add_email.includes("@")){
      setEmailMsg("Enter valid email!");
    }
    else if(orderItems.add_phone==="" || !orderItems.add_phone.match(/^[0-9]{10}$/)){
      setPhoneMsg("Enter valid phone number!");
    }
    else if(orderItems.add_address1===""){
      setAddress1Msg("Enter your address!");
    }
    else if(orderItems.add_state===""){
      setStateMsg("Enter your state!");
    }
    else if(orderItems.add_pincode==="" || !orderItems.add_pincode.match(/^[0-9]{6}$/)){
      setPincodeMsg("Enter valid pincode!");
    }
    else{  
  const find =async() => {
      for(var i =0;i< cartItems.length;i++)
      {
         const item = cartItems[i]
         const res = await Axios.get(`https://ays-backend.vercel.app/findemployee?profession=${item.type}&free=1&pincode=${orderItems.add_pincode}`,{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}})
         let emp = res.data.employees[0]  
        if(res.data.auth === true && res.data.employees.length > 0)
        {
          await Axios.post(`https://ays-backend.vercel.app/updateemployee`, {...emp,free:0},{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}})        
          await Axios.post(`https://ays-backend.vercel.app/orders`, 
          {status:0,iname:item.name,iimg:item.img,itype:item.type,ufname:userdetails.firstName,ulname:userdetails.lastName,uemail:userdetails.email,uphone:userdetails.phone,eid:emp.id,efname:emp.firstName,elname:emp.lastName,eemail:emp.email,ephone:emp.phone,eprofession:emp.eprofession,ord_name:orderItems.add_name,ord_email:orderItems.add_email,ord_phone:orderItems.add_phone,ord_address1:orderItems.add_address1,ord_address2:orderItems.add_address2,ord_state:orderItems.add_state,ord_pincode:orderItems.add_pincode,ord_date:orderItems.add_date},{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}})
        }
        else{
        await Axios.post(`https://ays-backend.vercel.app/orders`,
         {status:0,iname:item.name,iimg:item.img,itype:item.type,ufname:userdetails.firstName,ulname:userdetails.lastName,uemail:userdetails.email,uphone:userdetails.phone,eemail:"",ord_name:orderItems.add_name,ord_email:orderItems.add_email,ord_phone:orderItems.add_phone,ord_address1:orderItems.add_address1,ord_address2:orderItems.add_address2,ord_state:orderItems.add_state,ord_pincode:orderItems.add_pincode,ord_date:orderItems.add_date},{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}})
      }
      }
    }
    find()
    setCartItems([]);
      alert("Ordered Successfully");
      navigate("/ays/home")
    }
  }
  return (
    <div>
      <HomeNav />

    <p style={{marginTop:"90px"}}></p>
      <div className="cart-header" style={{ display: "flex",flexDirection: "row",justifyContent: "space-between",width:"600px"}}>
        <div>
        <h1 style={{ "margin-top": "60px", marginLeft: "50px"}}>
          <i
            style={{ marginRight: "20px"}}
            class="fa-solid fa-cart-shopping"
          ></i>
          Cart Items
        </h1>
        </div>
      </div>
      <hr style={{ width: "900px", height: "3px",color:"rgb(0, 0, 0)" }}></hr>


    {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h1 style={{color:"grey"}}>Cart is empty</h1>
        </div>
        ) : (


      <div className="cart-items">

        {cartItems.map((item,key) => {
          return (
            <div className="cart-card" key={key}>
              <CartItem
                img={item.img}
                name={item.name}
                rating={item.rating}
                size={item.size}
              />

              <button
                className="btn btn-danger"
                onClick={() => {
                  setCartItems(cartItems.filter((i,id) => id !== key));
                  toast.error("Item Removed from Cart!",{position: toast.POSITION.BOTTOM_RIGHT})
                }}
              >
                <i
                  style={{ marginRight: "5px" }}
                  class="fa-solid fa-cart-shopping"
                ></i>
                Remove
              </button>
            </div>
          );
        })}
      </div>

)}

{cartItems.length === 0 ?(<div className ="empty-cart"><i style={{fontSize:"100px", color:"rgba(255, 103, 108, 0.977)"}} className="far fa-frown-o"></i><div></div> </div>):(
    <div>
     
      <div className="cart-header" style={{ display: "flex" }}>
        <h1 style={{ "margin-top": "60px", marginLeft: "50px" }}>
          <i
            style={{ marginRight: "20px" }}
            class="fas fa-shipping-fast"
          ></i>
          Enter Shipping Address
        </h1>
      </div>

      <hr style={{ width: "900px", height: "2px" }}></hr>
      
      <div className="cart-form">
        <div>

      
      <form onSubmit={submitHandlerCart}>
            <div className="container">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ "margin-right": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    name="add_name"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="john"
                    // value={user.firstName}
                    onChange={(e)=>{
                      setNameMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{ nameMsg }</p>
                </div>
                
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ "margin-right": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Email</b>
                  </label>
                  <input
                    type="text"
                    name="add_email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="john@gmail.com"
                    // value={user.email}
                    onChange={(e)=>{
                      setEmailMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{emailMsg}</p>
                </div>
                <div style={{ "margin-left": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Phone</b>
                  </label>
                  <input
                    type="text"
                    name="add_phone"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="99****99"
                    // value={user.phone}
                    onChange={(e)=>{
                      setPhoneMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{phoneMsg}</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ "margin-right": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Address Line 1</b>
                  </label>
                  <input
                    type="text"
                    style={{height:"70px"}}
                    name="add_address1"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                    // value={user.email}
                    onChange={(e)=>{
                      setAddress1Msg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{address1Msg}</p>
                </div>
                <div style={{ "margin-left": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Address Line 2</b>
                  </label>
                  <input
                    type="text"
                    style={{height:"70px"}}
                    name="add_address2"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                    // value={user.phone}
                    onChange={(e)=>{
                      setPhoneMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{}</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ "margin-right": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>State</b>
                  </label>
                  <input
                    type="text"
                    name="add_state"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Andhra Pradesh"
                    // value={user.state}
                    onChange={(e)=>{
                      setStateMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{stateMsg}</p>
                </div>


                <div style={{ "margin-left": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="text"
                    name="add_pincode"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="500001"
                    // value={user.pincode}
                    onChange={(e)=>{
                      setPincodeMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{pincodeMsg}</p>
                </div>
            
              </div>
              <button type="submit" class="btn btn-primary">
                Order Items
              </button>
            </div>
          </form>
          </div>
      </div>
    </div>)}
    </div>
  );
}

export default Cart;