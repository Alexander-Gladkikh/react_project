import React, {useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "./PostIdPage";
import {privateRoutes, publicRoutes} from "../routers/routers";
import {AuthContext} from "../context/AuthContext";
import Loader from "./UI/Loader/Loader";

const AppRoute = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        element={<route.element/>}/>)}
                <Route path="/*" element={<Navigate to="/posts" replace />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        element={<route.element/>}/>)}
                <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>

    )
        ;
};

export default AppRoute;

