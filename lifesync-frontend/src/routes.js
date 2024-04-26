import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import Perfil from "./pages/Perfil";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SingIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/singup" element={<SingUp />} />
                <Route path="/singin" element={<SingIn />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;