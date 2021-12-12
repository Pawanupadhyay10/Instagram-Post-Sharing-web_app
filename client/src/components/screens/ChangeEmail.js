import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const ChangeEmail  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch('/change-email',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
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
            placeholder="Enter your previous email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Change Email
            </button>
            
    
        </div>
      </div>
   )
}


export default ChangeEmail