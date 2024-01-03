import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import useLocalStorage from "../hooks/useLocalStorage.js";
import { CLIENT_PATHS } from "../util/paths.js";
import { useApi } from "../hooks/useApi.js";
import { authService } from "../services/authService.js";

export const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
    const { currentUserData, setUserState, clearUserState } = useLocalStorage();
    // const { login, register, logout } = useApi(currentUserData ? currentUserData.accessToken : null, clearUserState, authService);
    // const navigate = useNavigate();

    // async function onLogin(formData) {
    //     const userInfo = await login(formData);
    //     setUserState(userInfo);
    //     navigate(CLIENT_PATHS.DASHBOARD);
    // }

    // async function onRegister(formData) {
    //     const userInfo = await register(formData);
    //     setUserState(userInfo);
    //     navigate(CLIENT_PATHS.DASHBOARD);
    // }

    // async function onLogout() {
    //     await logout();
    //     clearUserState();
    //     navigate(CLIENT_PATHS.LOGIN);
    // }

    const values = {
        currentUserData,
        clearUserState,
        setUserState,
        isAuthenticated: !!currentUserData?.accessToken,
        accessToken: currentUserData ? currentUserData.accessToken : null
    };


    return (
        <AuthContext.Provider value={values} >
            {children}
        </AuthContext.Provider>
    );
}

