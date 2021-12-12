import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const DeleteAccount  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const[passward,setPasword] = useState("")
    const {state,dispatch} = useContext(UserContext)
    const [isPasswordShown,setIsPasswordShown] = useState(false);
    const togglePassword = () =>{
        setIsPasswordShown(!isPasswordShown);
   }
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch('/delete-account',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                // "Authorization":"Bearer"+"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"
            },
            body:JSON.stringify({
                email,
                passward
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               localStorage.clear()
               dispatch({type:"CLEAR"})
               history.push('/signin')
           }
        })
        .catch(err=>{
            console.log(err)
        })
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="Enter your email id"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type={isPasswordShown ? "text":"password"}
            placeholder="Enter your password"
            value={passward}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button style={{fontSize:"15px"}} className="btn #64b5f6 blue darken-1" onClick={togglePassword}>
            {isPasswordShown===true?<p style={{fontSize: "15px",marginTop:"0px"}}>Hide Password</p>:<p style={{fontSize: "15px",marginTop:"0px"}}>Show Password</p>} <i style={{fontSize:"15px"}} className="far fa-eye"></i>
          </button>
          <br></br>
          <br></br>
            <button className="btn #c62828 red darken-3"
            onClick={()=>PostData()}
            >
               Delete My Account
            </button>
            
    
        </div>
      </div>
   )
}


export default DeleteAccount

