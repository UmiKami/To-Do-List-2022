import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FirebaseAuthService from "../FirebaseAuthService";
import { authActions } from "../store/auth";
import Login from "./Login";
import Settings from "./Settings";
import CredentialStatusPopup from "./CredentialsStatusPopup";


const Navbar = () => {
    const dispatch = useDispatch()

    const [showSettings, setShowSettings] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const profilePic = useSelector((state) => state.auth.userInfo.profilePic)
    
    const handleLogOut = async() => {
        await FirebaseAuthService.logoutUser();
        dispatch(authActions.setIsLoggedIn(false))
        dispatch(authActions.setAuthStatusCode(209))
    }

    const handleLogIn = () => {
        setShowLogin(true)    
    }

    useEffect(()=>{
    }, [isLoggedIn])


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="\">
                    MyTodo
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav align-items-center">
                       {isLoggedIn ? <li className="nav-item dropdown">
                            <Link
                                className="nav-link py-0"
                                to={"/"}
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={profilePic}
                                    alt="your profile"
                                    className="rounded-circle"
                                    width="40"
                                />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to={"/profile"}
                                    > 
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={()=>setShowSettings(true)}
                                    >
                                        Settings
                                    </button>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="\" onClick={()=>handleLogOut()}>
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </li> : <li>
                            <button className="btn btn-success" onClick={()=>handleLogIn()}>Log In</button>
                        </li> }
                    </ul>
                </div>
            </div>
            <Settings
                show={showSettings}
                onHide={() => setShowSettings(false)}
            />
            {!isLoggedIn && <Login
                show={showLogin}
                onHide={() => setShowLogin(false)}
            />}
            <CredentialStatusPopup show={showLogin}/>
        </nav>
    );
};

export default Navbar;
