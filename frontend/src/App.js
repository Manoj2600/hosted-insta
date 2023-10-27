import logo from './logo.svg';
import React,{createContext,useState} from 'react';
import './App.css';
import Navbar from "./componenets/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from './componenets/SignUp';
import SignIn from './componenets/SignIn';
import Profile from './screens/Profile';
import Home from './screens/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './screens/Createpost';
import { LoginContext } from './context/LoginContext';
import Modal from './componenets/Modal';
import UserProfile from './componenets/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';


function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  return(
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin,setModalOpen }}>
        <Navbar login={userLogin} />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route exact path="/profile" element={<Profile/>}></Route>
          <Route path="/createPost" element={<Createpost />}></Route>
          <Route path="/profile/:userid" element={<UserProfile />}></Route>
          <Route path="/followingpost" element={<MyFollowingPost />}></Route>
        </Routes>
        <ToastContainer theme="dark" />
        
        {modalOpen &&  <Modal setModalOpen={setModalOpen}> </Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
