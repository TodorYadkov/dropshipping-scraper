import { SERVER_PATHS } from '../util/paths.js';

export const adminService = (api) => {
    const getAllUsers = async () => api.get(SERVER_PATHS.ADMIN_GET_USERS);

    const getAdminStatistic = async () => api.get(SERVER_PATHS.ADMIN_USERS_STATISTIC);

    const updateUserRole = async (data) => api.put(SERVER_PATHS.ADMIN_UPDATE_USER_ROLE, data);

    const updateUserStatusToBeDisabled = async (data) => api.put(SERVER_PATHS.ADMIN_DISABLE_USER_STATUS, data);

    const updateUserStatusToBeEnabled = async (data) => api.put(SERVER_PATHS.ADMIN_ENABLE_USER_STATUS, data);

    return {
        getAllUsers,
        getAdminStatistic,
        updateUserRole,
        updateUserStatusToBeDisabled,
        updateUserStatusToBeEnabled,
    };
};
