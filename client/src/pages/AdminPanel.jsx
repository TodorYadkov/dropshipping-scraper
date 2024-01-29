/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { DATA_TYPES } from "../util/constants.js";

import { AdminPanelContext } from "../contexts/AdminPanelContext.jsx";

import { useApi } from "../hooks/useApi.js";
import { useFilterData } from "../hooks/useFilterData.js";
import { useIntervalTimeToReceiveData } from "../hooks/useIntervalTimeToReceiveData.js";

import { adminService } from "../services/adminService.js";

import { Loader } from "../components/Shared/Loader.jsx";
import { PageTitle } from "../components/Shared/PageTitle.jsx";
import { AlertError } from "../components/Alerts/AlertError.jsx";
import { DashboardAdminSummary } from "../components/Summaries/DashboardAdminSummary.jsx";
import { ResponsiveComponent } from "../components/Shared/ResponsiveComponent.jsx";

const AdminPanel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState('');
    const [adminPanelStatistic, setAdminPanelStatistic] = useState({});

    const [adminPanelData, setAdminPanelData, updateUserData] = useFilterData();
    const { getAllUsers, getAdminStatistic, updateUserRole } = useApi(adminService);

    const [_] = useIntervalTimeToReceiveData(fetchAdminPanelData, 10);

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

            const [users, adminPanelStatistic] = await Promise.all([
                getAllUsers(),
                getAdminStatistic()
            ]);

            setAdminPanelData(users);
            setAdminPanelStatistic(adminPanelStatistic);

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
        await fetchAdminPanelData();

    }

    const values = {
        updateUserData,
        updateUserRole,
        adminPanelStatistic
    };

    return (
        <PageTitle title={'Admin Panel'}>
            <AdminPanelContext.Provider value={values}>
                <div className='relative'>
                    {isLoading
                        ? <Loader />
                        : (
                            <>
                                <DashboardAdminSummary addAlertMessage={addAlertMessage} />

                                <ResponsiveComponent dataType={DATA_TYPES.USER} localFilteredState={adminPanelData} onRefresh={onRefreshClick} />

                            </>
                        )
                    }

                    {alert && (
                        <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <AlertError message={alert} close={onCloseAlert} />
                        </div>
                    )}
                </div>
            </AdminPanelContext.Provider>
        </PageTitle>
    );
};

export default AdminPanel;