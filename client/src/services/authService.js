import { SERVER_PATHS } from "../util/paths.js";

export const authService = (api) => {
    const login = async (data) => api.post(SERVER_PATHS.LOGIN, data);

    const register = async (data) => api.post(SERVER_PATHS.REGISTER, data);

    const logout = async () => api.get(SERVER_PATHS.LOGOUT);

    return {
        login,
        register,
        logout
    }
}