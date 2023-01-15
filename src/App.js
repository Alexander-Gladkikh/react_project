import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRoute from "./components/AppRoute";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <AppRoute/>
        </BrowserRouter>
    );
};

export default App;