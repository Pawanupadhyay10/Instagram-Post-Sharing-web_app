import React,{useState,useContext,} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
const NewEmail  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = ()=>{
        fetch("/new-email",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
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
            placeholder="Enter a new email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Update Email
            </button>
    
        </div>
      </div>
   )
}


export default NewEmail