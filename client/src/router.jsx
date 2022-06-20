import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import RegisterPage from "./pages/RegisterPage";
const AppRouter = () => {
    return (
        <Routes>
            <Route path='/board' element={<AppPage />} />
            <Route path='/index' element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            
        </Routes>
    );
};

export default AppRouter;
