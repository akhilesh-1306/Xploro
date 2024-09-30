import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home";
import { Route,Routes,Navigate,useNavigate } from "react-router-dom"
// import RefreshHandler from "./RefreshHandler";
import { useState } from "react";

function App() {

  const [isAuth,setIsAuth] = useState(false);
  // const PrivateRoute = ({el})=>{
  //   return isAuth ? el : <Navigate to="/"/>
  // }

  return (
    <div className="app">
      {/* <RefreshHandler setIsAuth={setIsAuth}/> */}
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login"/>} /> */}
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
