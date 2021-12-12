import React,{useState,useContext}  from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
import '../../App.css'
const SignIn = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [passward,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [isPasswordShown,setIsPasswordShown] = useState(false);
    const togglePassword = () =>{
        setIsPasswordShown(!isPasswordShown);
   }
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                passward,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"Signed In successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="Your Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type={isPasswordShown ? "text":"password"}
            placeholder="Your password"
            value={passward}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button style={{fontSize:"15px"}} className="btn #64b5f6 blue darken-1" onClick={togglePassword}>
            {isPasswordShown===true?<p style={{fontSize: "15px",marginTop:"0px"}}>Hide Password</p>:<p style={{fontSize: "15px",marginTop:"0px"}}>Show Password</p>} <i style={{fontSize:"15px"}} className="far fa-eye"></i>
          </button>
          <br></br>
          <br></br>
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                Login
            </button>
            <h5>
                <Link to="/signup">Don't have an account ?</Link>
            </h5>
            <h6>
                <Link to="/reset">Forgot password ?</Link>
            </h6>
    
        </div>
      </div>
    )
}

export default SignIn