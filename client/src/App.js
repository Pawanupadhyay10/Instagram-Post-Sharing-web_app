import React,{useEffect,createContext,useReducer,useContext} from 'react';
//import Circle from './components/screens/circle-cropped.png';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/screens/Home'
import SignIn from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import {reducer,initialState} from './reducers/userReducer'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassward'
import ChangeEmail from './components/screens/ChangeEmail'
import NewEmail from './components/screens/NewEmail'
import DeleteAccount from './components/screens/DeleteAccount'
import {useHistory,Switch} from 'react-router-dom'
// import ChangeUsername from './components/screens/Change-username'
// import ChangeName from './components/screens/Change-name'
import './App.css';
import ScrollToTop from './components/screens/ScrollToTop';
export const UserContext = createContext()
const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push('/signin')
    }
  },[])
   return(
    <Switch>
    <Route exact path="/" >
    <Home />
    </Route>
    <Route path="/signin">
      <SignIn />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
    <Route path="/create">
      <CreatePost/>
    </Route>
    <Route path="/profile/:userid">
        <UserProfile />
      </Route>
    <Route exact path="/reset">
     <Reset/>
     </Route>
     <Route path="/reset/:token">
        <NewPassword />
      </Route>
      <Route exact path="/change-email">
      <ChangeEmail />
      </Route>
      <Route path="/changeEmail/:token">
      <NewEmail />
    </Route>
    <Route path="/delete-account">
    <DeleteAccount />
  </Route>
  {/* <Route path="/change-username">
    <ChangeUsername />
  </Route>
  <Route path="/change-name">
    <ChangeName />
  </Route> */}
    </Switch>
   )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  
    return(

      <>
      <UserContext.Provider value={{state,dispatch}}>
      <div>
        <BrowserRouter>
        <NavBar />
        <main>
        <Routing />
        </main>
        <ScrollToTop />
        </BrowserRouter>
        </div>
        </UserContext.Provider>
        </>
    );
}

export default App;