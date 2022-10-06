import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link py-0"
                                to={"/"}
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img src={require("../img/avatar-61fcea3c44640b7a7f2443889f1fe383.jpg")} alt="your profile" className="rounded-circle" width="40"/>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                                <li>
                                    <Link className="dropdown-item" to={"/profile"}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={"/settings"}>
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="\">
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
