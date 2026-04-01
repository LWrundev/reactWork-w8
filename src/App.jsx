import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./assets/comps/Header";
import { login } from "./assets/slices/authSlice";
import GetTokenFromCookie from "./assets/utils/GetTokenFromCookie";
import axios from "axios";
function App() {
  const dispatch = useDispatch();

  //--每次重新整理時，redux都能重新抓到token與登入狀態
  useEffect(()=>{
    const token = GetTokenFromCookie();

    if(token){
      //---有抓到token，就放回axios
      axios.defaults.headers.common["Authorization"] = token;
      //--- 更新登入邏輯
      dispatch(login(token));      
    }
  },[dispatch])

  return (
    <>
    <Header></Header>
      <main className="">
        <Outlet></Outlet>
      </main>

    </>
  )
}

export default App
