import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import RegisterPage from "./pages/RegisterPage";
const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<AppPage />} />
            <Route  path='/login' element={<LoginPage />} />
            <Route  path='/register' element={<RegisterPage />} />

        </Routes>
    );
};

export default AppRouter;
