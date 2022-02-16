import React, {useEffect, useState} from "react";
import "./App.css";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../components/UI/navbar/Navbar";
import AppRoutes from "../components/AppRoutes";
import {AuthContext} from "../context/index";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')

    useEffect(() => {
        if (localStorage.auth) {
            setIsAuth(true)
            setName(localStorage.name)
        }
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            name,
            setIsAuth,
            isLoading,
        }}
        >
            <BrowserRouter>
                <Navbar/>
                <AppRoutes />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;

