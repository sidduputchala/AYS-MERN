import React,{useContext, useEffect,useState} from "react";
import HomeNav from "../components/HomeNav.js";
import ProfileComp from "../components/ProfileComp.js";
import {store} from '../App.js'
import Axios from 'axios'
import withRouter from "../withRouter.js";


function Profile() {
  const {cartItems,setCartItems,userdetails,setUserDetails,orderslist,setOrderslist}=useContext(store);
  const [profileData,setProfileData] = useState({})

  return (
    <div>
      <HomeNav />
      <p style={{marginTop:"70px"}}></p>
      <ProfileComp firstName={userdetails.firstName} lastName={userdetails.lastName} email={userdetails.email} phone={userdetails.phone} address={userdetails.address} city={userdetails.city} state={userdetails.state} pincode={userdetails.pincode}/>
    </div>
  );
}

export default withRouter(Profile);
