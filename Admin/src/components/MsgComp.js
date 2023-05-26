import React,{useRef} from 'react'
import Axios from 'axios'
import {store} from '../App'
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';


function MsgComp(props) {

    const navigate = useNavigate();
    const {msgList,setMsgList}=React.useContext(store) 
    const form = useRef();
    const sendMessage = (e) => {
        e.preventDefault();
      
        emailjs.sendForm("service_teo418n", "template_854brnf", form.current, "lERXfXjcjF38QjHJ3")
          .then((result) => {
             
              alert("Email Sent Successfully")
              form.current.reset();
          }, (error) => {
            
          });
      };

    const deleteMsg = (id)=>{
  
        msgList.map((val,key)=>{
            if(val._id===id){
                msgList.splice(key,1)
            } 
        })
        setMsgList([...msgList])
  
        Axios.delete(`https://ays-backend.vercel.app/deletemessage/${id}`,{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((res)=>{
           
        if(res.data.auth){
       
            alert('Message deleted successfully')
        }
        else{
            navigate('/');
        }
        }
        )
    }
  
    return (
      <div>
        <div style={{border: '1px solid black',height:"370px",width:"500px",marginBottom:"40px",marginLeft:"70px",borderRadius:"15px"}}>
  
        
  
        <div style={{display:"flex",flexDirection:"column"}}>
  
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
          <h5 style={{marginTop:"5px"}} >Message Id: {props.id}</h5>.
          <button type="button" style={{marginTop:"10px"}} class="btn btn-danger" onClick={()=>{
            deleteMsg(props.id);
          }}>Delete</button>
        </div>
  
        <div style={{border: "1px solid black",marginTop:"5px"}}></div>
        <div style={{display:"flex",marginTop:"20px",flexDirection:"column"}}>
  
    
        
          <div  style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",marginLeft:"20px"}}>
            <h7>Name: {props.name}</h7>
            <h7>Email: {props.email}</h7>
            <h7>Message: {props.message}</h7>
          </div>

          <div  style={{marginLeft:"20px",marginTop:"20px",display:"flex",flexDirection:"column"}}>
            <h6>Reply to:</h6>
            
    <form ref={form} onSubmit={sendMessage}>
      {/* <label>Name</label> */}
      <input style={{marginRight:"10px"}} type="text" name="user_name" value={props.name} />
     
      <input style={{marginBottom:"10px"}} type="email" name="user_email" value={props.email} />

      <textArea name="message" rows="3" cols="40">

    </textArea>
     
     <br></br>
      <input style={{marginTop:"10px"}} type="submit" value="Send"/>
    </form>
            
            
          </div>

        </div>
        </div>
        </div>
      </div>
    )
}

export default MsgComp
