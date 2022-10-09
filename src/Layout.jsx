import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Navbar from "./components/Navbar";

const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Layout;
