import { NavLink, useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { pushMsg } from "../slices/messageSlice"
import MessageToast from "./MessageToast"
import axios from "axios"

export default function Header(params) {
    const { isAuth } = useSelector((state) => state.auth);
    const apiUrl = import.meta.env.VITE_API_BASE;
    const dispatch=useDispatch();
    const navigate = useNavigate();
    //--處理登出邏輯
    const handleLogout = async()=>{
        try {
            const res =await axios.post(`${apiUrl}/v2/logout`);
            
            //-- 清理cookie與axios
            document.cookie= "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            delete axios.defaults.headers.common["Authorization"];

            dispatch((logout()));
            dispatch(pushMsg({
                type: 'success',
                title: '已登出',
                text: '拜拜~~'
            }))
    
            navigate('/');

        } catch (error) {
            dispatch(pushMsg({
                type: 'danger',
                title: '登出失敗',
                text: error.response?.data?.message || '再試一次...?'
            }))
            // 強制清理
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch(logout());
            navigate('/');
            }
    }
    return <>
        <MessageToast/>
        <header className="bg-body-tertiary">
            <nav className="container navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <NavLink to='/' className="nav-link active" aria-current="page">
                                Home
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink to="/productlist" className="nav-link">
                                商品列表
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink to="/cart" className="nav-link">
                                購物車
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order" className="nav-link">
                                訂單資訊
                                </NavLink>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center gap-3">
                            {
                                isAuth ? (
                                    <>
                                        <NavLink to='/admin'className="btn btn-info text-light fw-bold" >
                                            後台空間
                                        </NavLink>
                                        <button 
                                        type="button"
                                        className="btn btn-outline-info "
                                        onClick={handleLogout}
                                        >
                                            登出
                                        </button>
                                    </>
                                ) : (
                                    <NavLink to='/login'className="btn btn-info text-light fw-bold w-100" >
                                        登入
                                    </NavLink>

                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </>
}