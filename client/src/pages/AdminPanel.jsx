import { useEffect, useState } from "react";

import { useApi } from "../hooks/useApi.js";
import { adminService } from "../services/adminService.js";
import { useFilterData } from "../hooks/useFilterData.js";
import { useIntervalTimeToReceiveData } from "../hooks/useIntervalTimeToReceiveData.js";

import { AdminPanelContext } from "../contexts/AdminPanelContext.jsx";
import { AlertError } from "../components/Alerts/AlertError.jsx";
import { ResponsiveComponent } from "../components/ResponsiveComponent.jsx";
import { PageTitle } from "../components/PageTitle.jsx";
import { Loader } from "../components/Loader.jsx";
import { DATA_TYPES } from "../util/constants.js";



export const AdminPanel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState('');

    const [adminPanelData, setAdminPanelData, updateUserData] = useFilterData();
    const [_] = useIntervalTimeToReceiveData(fetchAdminPanelData);

    const { getAllUsers } = useApi(adminService);

    // Initial
    useEffect(() => {
        async function initialLoading() {
            setIsLoading(true);

            await fetchAdminPanelData();
            setIsLoading(false);
        }

        initialLoading();

    }, []);


    async function fetchAdminPanelData() {
        try {
            const users = await getAllUsers();
            setAdminPanelData(users);

        } catch (error) {
            console.error(error);
            addAlertMessage(error.message);
        }
    }

    function addAlertMessage(error) {
        setAlert(error);
    }

    function onCloseAlert() {
        setAlert('');
    }

    async function onRefreshClick() {
        return fetchAdminPanelData();
    }

    const values = {
        updateUserData
    }

    return (
        <PageTitle title={'Admin Panel'}>
            <AdminPanelContext.Provider value={values}>
                <div className='relative'>
                    {isLoading
                        ? <Loader />
                        : (
                            <>
                                {alert && (
                                    <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5">
                                        <AlertError message={alert} close={onCloseAlert} />
                                    </div>
                                )}

                                <ResponsiveComponent dataType={DATA_TYPES.USER} localFilteredState={adminPanelData} onRefresh={onRefreshClick} />
                            </>
                        )
                    }
                </div>
            </AdminPanelContext.Provider>
        </PageTitle>
    );
};