import React from "react";
import { Navigate } from "react-router-dom";
import { currentUser, isLogin } from "../api/Auth";

export default function PrivateRoute({ Component }) {
    const [user, setUser] = React.useState();
    React.useEffect(() => {
        currentUser(setUser);
    }, [])
    return isLogin() ? <Component user={user}/> : <Navigate to="/signIn" />
}