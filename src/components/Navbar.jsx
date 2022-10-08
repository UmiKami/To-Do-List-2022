import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth";
import Settings from "./Settings";

const Navbar = () => {
    const dispatch = useDispatch()

    const [showSettings, setShowSettings] = useState(false)

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
    const handleLogOut = () => {
        dispatch(authActions.setIsLoggedIn(false))    
    }

    const handleLogIn = () => {
        dispatch(authActions.setIsLoggedIn(true))    
    }

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
                                    src={require("../img/avatar-61fcea3c44640b7a7f2443889f1fe383.jpg")}
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
                                    <Link className="dropdown-item" href="\" onClick={handleLogOut}>
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </li> : <li>
                            <button className="btn btn-success" onClick={handleLogIn}>Log In</button>
                        </li> }
                    </ul>
                </div>
            </div>
            <Settings
                show={showSettings}
                onHide={() => setShowSettings(false)}
            />
        </nav>
    );
};

export default Navbar;
