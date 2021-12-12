import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
  const history = useHistory()
  const [username,setUsername] = useState("")
  const [name,setName] = useState("")
  const [passward,setPasword] = useState("")
  const [email,setEmail] = useState("")
  const [image,setImage] = useState("")
  const [isPasswordShown,setIsPasswordShown] = useState(false);
  const [url,setUrl] = useState(undefined)
  const togglePassword = () =>{
       setIsPasswordShown(!isPasswordShown);
  }
  useEffect(()=>{
      if(url){
          uploadFields()
      }
  },[url])
  const uploadPic = ()=>{
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","Insta-clone")
      data.append("cloud_name","amrita1")
      fetch("https://api.cloudinary.com/v1_1/amrita1/image/upload",{
          method:"post",
          body:data
      })
      .then(res=>res.json())
      .then(data=>{
         setUrl(data.url)
      })
      .catch(err=>{
          console.log(err)
      })
  }
  const uploadFields = ()=>{
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
          return
      }
      fetch("/signup",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              username,
              name,
              passward,
              email,
              pic:url
          })
      }).then(res=>res.json())
      .then(data=>{
         if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
         }
         else{
             M.toast({html:data.message,classes:"#43a047 green darken-1"})
             M.toast({html: "Email sent on your email id",classes:"#43a047 green darken-1"})
             history.push('/signin')
         }
      }).catch(err=>{
          console.log(err)
      })
  }
  const PostData = ()=>{
      if(image){
          uploadPic()
      }else{
          uploadFields()
      }  
  }
    return (
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="Enter a username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="Your Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type={isPasswordShown ? "text":"password"}
            placeholder="Set a password"
            value={passward}
            onChange={(e) =>{
                setPasword(e.target.value)
            } }/>
            <button style={{fontSize:"15px"}} className="btn #64b5f6 blue darken-1" onClick={togglePassword}>
            {isPasswordShown===true?<p style={{fontSize: "15px",marginTop:"0px"}}>Hide Password</p>:<p style={{fontSize: "15px",marginTop:"0px"}}>Show Password</p>} <i style={{fontSize:"15px"}} className="far fa-eye"></i>
          </button>
          <br></br>
          <span style={{ 
            fontWeight: 'bold', 
            color: 'red', 
            marginTop: '15px'
          }}>Your password must have atleast :-
           <ul style={{marginTop:"0px"}}>
           <li>Minimum 8 characters.</li>
           <li>One lowercase alphabet</li>
           <li>One uppercase alphabet</li>
           <li>One numeric value</li>   
           </ul>
          </span> 
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Profile pic</span>
                <input type="file" onChange={(e)=>{
                    var file = e.target.files[0];
                    var t = file.type.split('/').pop().toLowerCase();
                    if (t !== "jpeg" && t !== "jpg" && t !== "png") {
                        M.toast({html: "Image Format is invalid",classes:"#c62828 red darken-3"})
                        return;
                    } 
                    setImage(e.target.files[0])
                }} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Not compulsory" />
            </div>
            </div>
            
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                Sign Up
            </button>
            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>
    
        </div>
      </div>
    )
}

export default Signup