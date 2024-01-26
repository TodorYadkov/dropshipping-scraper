import { SERVER_PATHS } from '../util/paths.js';

export const adminService = (api) => {
    const getAllUsers = async () => api.get(SERVER_PATHS.GET_ALL_USERS);

    return {
        getAllUsers
    };
};
