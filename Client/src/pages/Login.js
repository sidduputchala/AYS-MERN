import React, { useState,useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Login.css";
import MainImage from "./Images/indeximage.jpg";
import Builder from "./Images/builder.png";
import MainNav from "../components/MainNav";
import Axios from "axios";
import {store}from "../App.js" 
import HomeNav from "../components/HomeNav";
import {toast} from 'react-toastify'  

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [pmsg, setPmsg] = useState("");
  const [imsg, setImsg] = useState("");
  const {cartItems,setCartItems,userdetails,setUserDetails,orderslist,setOrderslist}=useContext(store);
  const [passwordType, setPasswordType] = useState("password");
 
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const submitHandler = (e) => {
   
    e.preventDefault();
    if (email === "") {
      e.preventDefault();
      setMsg("Enter your email!");

    } else if (!email.includes("@")) {
      e.preventDefault();
      setMsg("Enter a valid email!");
  
    } else if (password === "") {
      e.preventDefault();
      setPmsg("Enter your password!");
  
    } 
    else {
      Axios.get(
        `https://ays-backend.vercel.app/login?email=${email}&password=${password}`
      ).then((res) => {


        if (res.data.auth === true) {
  
            localStorage.setItem("token", res.data.token);
       
          setUserDetails(res.data.users[0])
          alert("Login successful!");
          navigate("/ays/home");
        } else {
 
          toast.error('Invalid Username or Password!', {position: toast.POSITION.BOTTOM_RIGHT})

        }
      });
    }
  };
  return (
    <>
    <MainNav/>
     <img style={{height:"650px"}} src="./indeximage.jpg"/>

        <form className="form_l" onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3>Login Here</h3>
          <p style={{ color: "red" }}>{pmsg}</p>
          <div className="input__box">
            <label className="label_l" for="username"><p className="names">Username</p></label>
            <input className="input_l"
              type="text"
              id="username"
              name="email"
              placeholder="Email"
              required="required"
              onChange={(e) => {
                setMsg("")
                setImsg("")
                setEmail(e.target.value);
              }}
            />
              <p style={{ color: "red" }}>{msg}</p>
          </div>
          <div className="input__box">
            <label for="password"><p className="names">Password</p></label>
            <input className="input_l"
              type={passwordType}
              id="password"
              name="password"
              required="required"
              placeholder="Password"
              onChange={(e) => {
                setPmsg("")
                setImsg("")
                setPassword(e.target.value);
              }}
            />
            <div className="input__box"  style={{"margin-top":"3px",cursor: "pointer",paddingLeft:"10px"}} onClick={togglePassword}>
                <input type="checkbox" onChange={(e)=>{
                  togglePassword()
                }}/>
                <label for="showpassword"><small>Show Password</small></label>
            </div>
             <p style={{ color: "red" }}>{pmsg}</p>
          </div>
    
          <div className="input__box">
            <button type="submit" className="button_l">
              Log in
            </button>
          </div>
          <p class="forget">Don't have an account? <Link to="/signup">Sign up</Link> </p>
        
        </form>
       
</>
  );
}

export default Login;