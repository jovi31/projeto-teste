import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Home from "./pages/Home";

function RoutesHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<PrivateRoute Component={Home} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHandler;
