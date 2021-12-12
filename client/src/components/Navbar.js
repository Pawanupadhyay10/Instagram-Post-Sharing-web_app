import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import styled from 'styled-components'
import {GrClose} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';
import {FiCamera} from 'react-icons/fi';
import {BiHomeAlt} from 'react-icons/bi'
import M from 'materialize-css'
import ScrollToTop from './screens/ScrollToTop/index'
import '../App.css'
import GoToTop from './screens/ScrollToTop';
const StyledButton = styled.button`
    font-size: 1.7rem;
`
const StyledIcon = styled.div`
    font-size: 1.5rem;
    margin-left: -10px;
    margin-top: 2px;
    @media only screen and (max-width: 800px) {
       margin-left: -15px;
    }
`
const StyledIcon1 = styled.div`
    font-size: 1.5rem;
    margin-left: -35px;
    margin-top: 2px;
`
const Navbar = () => {
  const  searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  useEffect(()=>{
    M.Modal.init(searchModal.current)
},[])
  const renderList = ()=>{
    if(state){
      return [
        <li key="1"><StyledIcon1><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></StyledIcon1></li>,
        <li key="2"><Link to={state?"/":"/signin"}><StyledIcon><BiHomeAlt /></StyledIcon></Link></li>,
        <li key="3"><Link to="/profile"><StyledIcon><CgProfile /></StyledIcon></Link></li>,
        <li key="4"><Link to="/create"><StyledIcon><FiCamera /></StyledIcon></Link></li>,
        <li  key="5">
        <button className="btn #c62828 red darken-3 ok"
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
          M.toast({html: "Logged out successfully",classes:"#43a047 green darken-1"})
        }}
        >
            Logout
        </button>
        </li>
      ]
  }
  else{
    return [
      <li  key="6"><Link to="/signin">SignIn</Link></li>,
      <li  key="7"><Link to="/signup">SignUp</Link></li>
    ]
  }
}
const fetchUsers = (query)=>{
  setSearch(query)
  fetch('/search-users',{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      query
    })
  }).then(res=>res.json())
  .then(results=>{
    setUserDetails(results.user)
  })
}
    return (
        <nav className="navbar">
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            { renderList() }
          </ul>
          </div>
          <div id="modal1" className="modal style-width" ref={searchModal} style={{color:"black"}}>
          <div className="modal-footer">
          <StyledButton className="modal-close waves-effect waves-white btn-flat right" onClick={()=>setSearch('')}><GrClose /></StyledButton>
          </div>
          <div className="modal-content">
          <input
            type="text"
            placeholder="Search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
           {
               userDetails && userDetails.length>0
               ?
                <ul className="collection">
             {userDetails.map(item=>{
              return (
                 <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                  M.Modal.getInstance(searchModal.current).close()
                  setSearch('')
                }}><li className="collection-item">
                <img className="search-image" src={item.pic} alt={item._id}/>
                <span className="search-name">{item.username}</span>
                <span className="search-email">{item.email}</span>
                {/* <span className="search-name">{item.name}</span> */}
                </li></Link> 
              ) 
            })}
              </ul> : <ul>No result found</ul>
           } 
          </div>
        </div>
        <ScrollToTop />
        <GoToTop />
      </nav>
    )
}

export default Navbar
