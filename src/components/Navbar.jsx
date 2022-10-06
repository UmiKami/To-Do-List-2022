import React from "react";

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
                            <a
                                className="nav-link py-0"
                                href="\"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img src={require("../img/avatar-61fcea3c44640b7a7f2443889f1fe383.jpg")} alt="your profile" className="rounded-circle" width="40"/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                                <li>
                                    <a className="dropdown-item" href="\">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="\">
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="\">
                                        Log Out
                                    </a>
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
