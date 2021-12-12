import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import '../../App.css'
const CreatePost = () => {
    const history = useHistory()
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
         fetch("/createPost",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer"+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 body,
                 pic:url
             })
         }).then(res=>res.json())
         .then(data=>{
     
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
                history.push('/')
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])
    const postDetails = ()=>{
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
    return (
        <div className="card okk input-field"
        >
            <textarea className="textarea card"
            cols="30" rows="5"
             type="text"
              placeholder="Write a caption"
              value={body}
            onChange={(e)=>setBody(e.target.value)}
              />
            <div className="file-field input-field">
             <div className="btn #64b5f6 blue darken-1">
                 <span>Upload Image</span>
                 <input type="file" onChange={(e)=>{
                    var file = e.target.files[0];
                    var t = file.type.split('/').pop().toLowerCase();
                    if (t != "jpeg" && t != "jpg" && t != "png") {
                        M.toast({html: "Image Format is invalid",classes:"#c62828 red darken-3"})
                        return;
                    }
                    setImage(e.target.files[0])
                 }} />
             </div>
             <div className="file-path-wrapper">
                 <input className="file-path validate" type="text" placeholder="jpg/jpeg/png" />
             </div>
             </div>
             <button className="btn #64b5f6 blue darken-1"
             onClick={()=>postDetails()}
             >
                 Post Image
             </button>
 
        </div>
    )
}

export default CreatePost
