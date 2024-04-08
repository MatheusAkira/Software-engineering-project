import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingIn from "./pages/SingIn";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SingIn />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;